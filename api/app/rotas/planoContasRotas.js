var express = require('express');
var router = express.Router();
const controller = require('../controllers/planoContasController.js')

router.get('/', controller.get)

module.exports = router;