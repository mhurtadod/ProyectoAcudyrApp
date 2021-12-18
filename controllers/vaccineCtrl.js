const Vaccines = require("../models/vaccineModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const vaccineCtrl = {
  //Se encarga de evaluar y subir el registro al servidor
  register: async (req, res) => {
    try {
      const { name, stock } = req.body;

      if (!name || !stock)
        return res
          .status(400)
          .json({ msg: "Por favor rellena todos los campos." });

      
      const vaccine = await Vaccines.findOne({ name });
      if (vaccine) return res.status(400).json({ msg: "Este correo ya existe" });


      const newVaccine = new Vaccines({
        name,
        stock
      });

      await newVaccine.save();

      res.json({ msg: "Se ha creado la vacuna correctamente!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getVaccineInfor: async (req, res) => {
    try {
        const vaccine = await Vaccines.findById(req.params["id"]);

        res.json(vaccine)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  getVaccines: async (req, res) => {
    try {
        const vaccines = await Vaccines.find();

        res.json(vaccines)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  updateStockVaccine: async (req, res) => {
    try {
        const vaccine = await Vaccines.findById(req.params["id"]);
        vaccine.stock = vaccine.stock - 1;
        await vaccine.save();
        res.json(vaccine);
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  }
};

module.exports = vaccineCtrl;
