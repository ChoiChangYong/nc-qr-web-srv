var express = require('express');
var router = express.Router();
var request = require('request');

/* GET join page */
router.get('/', function (req, res, next) {
    res.render('join', {
        title: 'Join',
    });
});

/* POST join */
router.post('/', function (req, res, next) {
    var user = {
        'id': req.body.id,
        'password': req.body.password,
        'name': req.body.name
    };

    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://172.19.144.61:3000/join',
        body: user,
        json: true
    }, function(error, response, body){
        console.log(body);
        if(body.result==0){
            res.render('join', {
                message: body.message
            });
        }
        else
            res.redirect('/login');
    });
});

module.exports = router;
