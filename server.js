require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//Rutas
app.use("/user", require("./routes/userRouter"));
app.use("/vaccine", require("./routes/vaccineRouter"));
app.use("/pai", require("./routes/paiRouter"));

//Conexión a mongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("El servidor ha arrancado en el puerto ", PORT);
});
