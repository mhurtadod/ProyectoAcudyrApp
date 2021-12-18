const router = require('express').Router()
const vaccineSchemaCtrl = require('../controllers/vaccineSchemaCtrl')
//Todas las rutas y sus respectivos métodos.

//VaccineController
router.get('/', vaccineSchemaCtrl.getAllPai)
router.get('/:id', vaccineSchemaCtrl.getPaiInfor)
router.get('/age/:age', vaccineSchemaCtrl.getPaiByAge)
router.post('/', vaccineSchemaCtrl.register)

module.exports = router