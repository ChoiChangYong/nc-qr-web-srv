var express = require('express');
var router = express.Router();

const request = require('request')

/* POST logout */
router.post('/logout', function(req, res, next) {
  res.clearCookie('accessToken');
  res.redirect('/');
});

/* GET main page */
router.get('/', function(req, res, next) {
  const user_token = {
    user_token: req.cookies.accessToken
  };

  if(user_token.user_token){
    console.log("/ (GET) : is user token");
    request.post({
      headers: {'content-type': 'application/json'},
      url: 'http://172.19.144.61:3000/user-token/validation',
      body: user_token,
      json: true
    }, function(error, response, body){
      console.log("=============body=============");
      console.log(body);
      console.log("==============================");

      if(body.result==1){
        res.render('index', {
          id: body.id,
          name: body.name 
        });
      } else{
        res.render('index');
      }
    });
  } else {
    console.log("/ (GET) : is not user token, login redirect");
    res.render('index'); 
  }
});

module.exports = router;
