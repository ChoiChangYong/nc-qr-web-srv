var Request = require('../services').Request;
var config = require('../config');

/**
 * 로그인 페이지, 자동 로그인을 위해 AuthSrv로 토큰 검증 요청
 */
exports.getLoginPage = (req, res, next) => {
    const request = {
        sessionID: req.cookies.sessionID
    };

    if(request.sessionID){
        console.log("/login (GET)  : is sessionID");
        Request.verifyUserSession(request.sessionID, (callback) => {
            if(callback.result)
                res.render('main', {id: callback.id, name: callback.name});
            else
                res.render('login', { title: 'Login' });
        });
    } else {
        console.log("/login (GET) : is not sessionID, login redirect");
        res.render('login', { title: 'Login' });
    }
};

/**
 * 로그인 버튼 클릭, Auth Server로 인증 요청
 */
exports.processLogin = (req, res, next) => {
    var user = {
        'id': req.body.id,
        'password': req.body.password
    };
    console.log(user);
    console.log("/login (GET)  : is user session");
    Request.authenticationUser(user, (callback) => {
        if(callback.result){
            res.cookie("user-session", callback.sessionID, {
                maxAge: config.cookieExpireTime,
                httpOnly: true,
                // secure: true
            });
            res.redirect('/');
        } else {
            res.render('login', {message: "아이디 또는 비밀번호가 맞지 않습니다."});  
        }
    });
};