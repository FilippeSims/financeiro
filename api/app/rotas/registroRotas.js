var express = require('express');
var router = express.Router();
const controller = require('../controllers/registroController')



router.get('/', controller.get)
router.post('/', controller.post)
router.delete('/:id', controller.delete)
router.put('/:id', controller.put)

module.exports = router;