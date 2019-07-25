var Request = require('../services').Request;

/**
 * 로그인 페이지, 자동 로그인을 위해 AuthSrv로 토큰 검증 요청
 */
exports.getLoginPage = (req, res, next) => {
    const request = {
        user_token: req.cookies.accessToken
    };

    if(request.user_token){
        console.log("/login (GET)  : is user token");
        Request.requestUserTokenValidation(request.user_token, (callback) => {
            if(callback.result)
                res.render('main', {id: callback.id, name: callback.name});
            else
                res.render('login', { title: 'Login' });
        });
    } else {
        console.log("/login (GET) : is not user token, login redirect");
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
    
    console.log("/login (GET)  : is user token");
    Request.requestUserInfoVerification(user, (callback) => {
        if(callback.result){
            res.cookie("accessToken", callback.user_token, {
                maxAge: 60*60*1000,   // 1시간
                httpOnly: true,
                // secure: true
            });
            res.render('main', {id: callback.id, name: callback.name});
        } else {
            res.render('login', {message: "아이디 또는 비밀번호가 맞지 않습니다."});  
        }
    });
};