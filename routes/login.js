var express = require('express');
var router = express.Router();

const request = require('request')

/* GET login page */
router.get('/', function(req, res, next) {
  const user_token = {
    user_token: req.cookies.accessToken
  };
  
  if(user_token.user_token){
    console.log("/login (GET)  : is user token");
    
    request.post({
      headers: {'content-type': 'application/json'},
      url: 'http://172.19.144.61:3000/user-token/validation',
      body: user_token,
      json: true
    }, function(error, response, body){
      console.log(body);
      
      if(body.result==0)
        res.render('login', { title: 'Login' });
      else
        res.redirect('/');
    });
  } else {
    console.log("/login (GET) : is not user token, login redirect");
    res.render('login', { title: 'Login' });
  }
});

/* POST login */
router.post('/', function(req, res, next) {
  var user = {
    'id': req.body.id,
    'password': req.body.password
  };
  console.log(user);
  request.post({
    headers: {'content-type': 'application/json'},
    url: 'http://172.19.144.61:3000/login',
    body: user,
    json: true
  }, function(error, response, body){
    console.log("=============body=============");
    console.log(body);
    console.log("==============================");

    if(body.result==1){
      res.cookie("accessToken", body.user_token, {
        maxAge: 60*60*1000,   // 1시간
        httpOnly: true,
        // secure: true
      });
      res.redirect('/');
    }
    else{
      res.render('login', {
        message: "아이디 또는 비밀번호가 맞지 않습니다."
      });    
    }
  });
});

/* GET QR-Code login page */
router.get('/qrcode', function(req, res, next) {
    console.log("/qrcode (GET) : create qrcode");

    request.get({
      headers: {'content-type': 'application/json'},
      url: 'http://172.19.144.61:3000/qrcode',
      json: true
    }, function(error, response, body){
      console.log("=============body=============");
      console.log(body);
      console.log(body.qrcode);
      console.log("==============================");

      if(body.result==1){
        res.render('login_qrcode', { 
          title: 'QR-Code Login',
          qrcode: body.qrcode,
          massage: body.massage
        });
      }
      else{
        res.render('login_qrcode', { 
          title: 'QR-Code Login',
          massage: body.massage
        });
      }
    });
  // }
});

module.exports = router;
