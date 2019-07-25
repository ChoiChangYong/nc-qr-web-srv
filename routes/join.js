var express = require('express');
var router = express.Router();
var join = require('../controllers/join');

/* GET join page */
router.get('/', join.getJoinPage);

/* POST process join */
router.post('/', join.processJoin);

module.exports = router;
