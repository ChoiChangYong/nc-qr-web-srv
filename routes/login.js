var express = require('express');
var router = express.Router();
var login = require('../controllers/login');

/* GET login page */
router.get('/', login.getLoginPage);

/* POST process login */
router.post('/', login.processLogin);

module.exports = router;
