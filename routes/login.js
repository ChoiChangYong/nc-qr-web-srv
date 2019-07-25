var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var qrlogin = require('../controllers/qrlogin');

/* GET login page */
router.get('/', login.getLoginPage);

/* POST process login */
router.post('/', login.processLogin);

/* GET QR-Code login page */
router.get('/qrcode', qrlogin.getLoginPage);

module.exports = router;
