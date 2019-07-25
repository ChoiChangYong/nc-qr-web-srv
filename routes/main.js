var express = require('express');
var router = express.Router();
var main = require('../controllers/main');

/* POST logout */
router.post('/logout', main.logout);

/* GET main page */
router.get('/', main.getMainPage);

module.exports = router;
