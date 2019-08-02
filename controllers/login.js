var Request = require('../services').Request;
var config = require('../config');

/**
 * 로그인 페이지, 자동 로그인을 위해 AuthSrv로 토큰 검증 요청
 */
exports.getLoginPage = async (req, res, next) => {
    const request = {
        sessionID: req.cookies.sessionID
    };

    if(!request.sessionID){
        console.log("/login (GET) : is not sessionID, login redirect");
        return res.render('login', { title: 'Login' });
    } 

    const verifyUserSessionResult = await Request.verifyUserSession(request.sessionID);
    if(verifyUserSessionResult.result)
        res.render('main', {id: callback.id, name: callback.name});
    else
        res.render('login', { title: 'Login' });
};

/**
 * 로그인 버튼 클릭, Auth Server로 인증 요청
 */
exports.processLogin = async (req, res, next) => {
    var user = {
        'id': req.body.id,
        'password': req.body.password
    };
    
    const authenticationUserResult = await Request.authenticationUser(user);
    if(!authenticationUserResult.result){
        return res.render('login', {message: "아이디 또는 비밀번호가 맞지 않습니다."});  
    } 

    res.cookie("user-session", authenticationUserResult.sessionID, {
        maxAge: config.cookieExpireTime,
        httpOnly: true,
        // secure: true
    });
    res.redirect('/');
};