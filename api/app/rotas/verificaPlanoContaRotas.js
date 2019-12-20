var express = require('express');
var router = express.Router();
const controller = require('../controllers/verificaPlanoContaController')


router.get('/', controller.get)

module.exports = router;