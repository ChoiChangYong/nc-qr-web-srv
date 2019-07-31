var Request = require('../services').Request;

/**
 * 로그아웃 처리, 쿠키삭제
 */
exports.logout = (req, res, next) => {
    Request.deleteUserSession(req.cookies.sessionID, (callback) => {
        if(callback.result){
            res.clearCookie('user-session');
            res.redirect('/');
        } else {
            console.log("로그아웃 실패!");
        }
    });
};

/**
 * 메인 페이지, 자동 로그인 처리를 위해 AuthSrv로 토큰 검증 요청
 */
exports.getMainPage = (req, res, next) => {
    const request = {
        sessionID: req.cookies.sessionID
    };

    if(request.sessionID){
        console.log("/ (GET) : is user session");
        Request.verifyUserSession(request.sessionID, (callback) => {
            if(callback.result){
                Request.getUserInfo(request.sessionID, (callback) => {
                    res.render('main', {id: callback.id, name: callback.name});
                });
            } else {
                res.render('main');
            }
        });
    } else {
        console.log("/ (GET) : is not user session, login redirect");
        res.render('main'); 
    }
};