var express = require('express');
var router = express.Router();
const controller = require('../controllers/saldoPlanoContasController.js')

router.get('/', controller.get)

module.exports = router;