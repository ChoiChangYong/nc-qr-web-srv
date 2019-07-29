var request = require('request');

/**
 * Auth Server로 유저 토큰 유효성 검증 요청
 */
exports.requestUserTokenValidation = (user_token, callback) => {
    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://172.19.148.51:3000/user-token/validation',
        body: {user_token},
        json: true
      }, function(error, response, body){
        console.log(body);
        if(body.result==0){
            callback({result:false});
        } else {
            callback({result:true, id:body.id, name:body.name});
        }
    });
};

/**
 * Auth Server로 아이디 패스워드 검증 요청
 */
exports.requestUserInfoVerification = (user, callback) => {
    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://172.19.148.51:3000/login',
        body: user,
        json: true
    }, function(error, response, body){
        console.log("=============body=============");
        console.log(body);
        console.log("==============================");
    
        if(body.result==1){
            callback({result:true, user_token:body.user_token, id:body.id, name:body.name});
        } else {
            callback({result:false});
        }
    });
};

/**
 * Auth Server로 QR코드 생성 요청
 */
exports.requestQrcodeCreate = (callback) => {
    request.get({
        headers: {'content-type': 'application/json'},
        url: 'http://172.19.148.51:3000/qrcode',
        json: true
    }, function(error, response, body){
        console.log("=============body=============");
        console.log(body);
        console.log("==============================");
  
        if(body.result==1){
            callback({result:true, qrcode:body.qrcode});
        } else {
            callback({result:false});
        }
    });
};

/**
 * Auth Server로 회원가입 처리 요청
 */
exports.requestUserJoin = (user, callback) => {
    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://172.19.148.51:3000/join',
        body: user,
        json: true
    }, function(error, response, body){
        console.log(body);
        if(body.result==0)
            callback({result:false, message:body.message});
        else
            callback({result:true, message:body.message});
    });
};