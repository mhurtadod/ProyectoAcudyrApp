const Pai = require("../models/paiModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const vaccineSchemaCtrl = {
  //Se encarga de evaluar y subir el registro al servidor
  register: async (req, res) => {
    try {
      const { age, vaccines } = req.body;
      console.log(req.body);
      if (!age || !vaccines)
        return res
          .status(400)
          .json({ msg: "Por favor rellena todos los campos." });

      const newPai = new Pai({
        age,
        vaccines
      });

      await newPai.save();

      res.json({ msg: "Se ha creado la vacuna correctamente!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPaiInfor: async (req, res) => {
    try {
        const pai = await Pai.findById(req.params["id"]);

        res.json(pai)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  getPaiByAge: async (req, res) => {
    try {
        const pai = await Pai.find({ age: req.params["age"]});

        res.json(pai)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
  getAllPai: async (req, res) => {
    try {
        const pai = await Pai.find();

        res.json(pai)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  }
};

module.exports = vaccineSchemaCtrl;
