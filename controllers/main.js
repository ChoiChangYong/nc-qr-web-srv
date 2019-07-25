var Request = require('../services').Request;

/**
 * 로그아웃 처리, 쿠키삭제
 */
exports.logout = (req, res, next) => {
    res.clearCookie('accessToken');
    res.redirect('/login');
};

/**
 * 메인 페이지, 자동 로그인 처리를 위해 AuthSrv로 토큰 검증 요청
 */
exports.getMainPage = (req, res, next) => {
    const request = {
        user_token: req.cookies.accessToken
    };

    if(request.user_token){
        console.log("/ (GET) : is user token");
        Request.requestUserTokenValidation(request.user_token, (callback) => {
            if(callback.result){
                res.render('main', {id: callback.id, name: callback.name});
            } else {
                res.render('main');
            }
        });
    } else {
        console.log("/ (GET) : is not user token, login redirect");
        res.render('main'); 
    }
};