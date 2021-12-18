const router = require('express').Router()
const vaccineCtrl = require('../controllers/vaccineCtrl')
//Todas las rutas y sus respectivos métodos.

//VaccineController
router.get('/', vaccineCtrl.getVaccines)
router.get('/:id', vaccineCtrl.getVaccineInfor)
router.post('/', vaccineCtrl.register)
router.put('/:id', vaccineCtrl.updateStockVaccine)

module.exports = router