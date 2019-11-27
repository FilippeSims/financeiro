var express = require('express');
var router = express.Router();
const controller = require('../controllers/dadosUserController')


router.get('/', controller.get)

module.exports = router;