var request = require('request');
var config = require('../config');

/**
 * Auth Server로 아이디 패스워드 검증 요청
 */
exports.authenticationUser = (user) => {
    return new Promise(resolve => { 
        request.post({
            headers: {'Accept': 'application/json'},
            url: config.serverIP.authSrv+'/login',
            body: user,
            json: true
        }, function(error, response, body){
            console.log("=============body=============");
            console.log(body);
            console.log("==============================");
        
            if(body.result==1){
                resolve({result:true, sessionID:body.sessionID});
            } else {
                resolve({result:false});
            }
        });
    });
};

/**
 * Auth Server로 유저 세션 검증 요청
 */
exports.verifyUserSession = (sessionID) => {
    return new Promise(resolve => { 
        request.post({
            headers: {'content-type': 'application/json'},
            url: config.serverIP.authSrv+'/session/verification',
            body: {sessionID},
            json: true
        }, function(error, response, body){
            console.log(body);
            if(body.result==0){
                resolve({result:false});
            } else {
                resolve({result:true, id:body.id, name:body.name});
            }
        });
    });
};

/**
 * 유저 세션 검증 성공 시, Auth Server로 유저 정보 요청
 */
exports.getUserInfo = (sessionID) => {
    return new Promise(resolve => { 
        request.get({
            headers: {'content-type': 'application/json'},
            url: config.serverIP.authSrv+'/users/'+sessionID,
            json: true
        }, function(error, response, body){
            console.log(body);
            if(body.result==0){
                resolve({result:false});
            } else {
                resolve({result:true, id:body.id, name:body.name});
            }
        });
    });
};

/**
 * Auth Server로 세션 삭제 요청
 */
exports.deleteUserSession = (sessionID) => {
    return new Promise(resolve => { 
        request.delete({
            headers: {'content-type': 'application/json'},
            url: config.serverIP.authSrv+'/sessions/'+sessionID,
            json: true
        }, function(error, response, body){
            console.log(body);
            if(body.result==0){
                resolve({result:false});
            } else {
                resolve({result:true});
            }
        });
    });
};

/**
 * Auth Server로 회원가입 처리 요청
 */
exports.addUser = (user) => {
    return new Promise(resolve => { 
        request.post({
            headers: {'content-type': 'application/json'},
            url: config.serverIP.authSrv+'/join',
            body: user,
            json: true
        }, function(error, response, body){
            console.log(body);
            if(body.result==1)
                resolve({ result:true, message:body.message }); 
            else
                resolve({ result:false, message:body.message }); 
        });
        
    });
};

/**
 * Auth Server로 QR코드 생성 요청
 */
exports.createQrcode = (instanceId) => {
    return new Promise(resolve => { 
        request.get({
            headers: {'content-type': 'application/json'},
            url: config.serverIP.authSrv+'/qrcode/'+instanceId,
            json: true
        }, function(error, response, body){
            console.log("=============body=============");
            console.log(body);
            console.log("==============================");
    
            if(body.result==1){
                resolve({result:true, qrcode:body.qrcode});
            } else {
                resolve({result:false});
            }
        });
    });
};
