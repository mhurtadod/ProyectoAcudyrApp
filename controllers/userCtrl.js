const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  //Se encarga de evaluar y subir el registro al servidor
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res
          .status(400)
          .json({ msg: "Por favor rellena todos los campos." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Correo invalido" });

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "Este correo ya existe" });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "La contraseña debe tener al menos 6 caracteres" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      res.json({ msg: "Te has registrado correctamente!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Se encargar de iniciar la sesión con los campos correspondientes
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Este correo no existe." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Contraseña es incorrecta" });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Has iniciado sesión" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Genera un token de acceso
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Inicia sesión ahora!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Inicia sesión ahora!" });

        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password')

        res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

  //Para cerrar la sesión del usuario
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Desconectado" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
//Validar correos con la expresión regular
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
//Actualiza el token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
//Crea el token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = userCtrl;
