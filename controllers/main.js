var Request = require('../services').Request;

/**
 * 로그아웃 처리, 쿠키삭제
 */
exports.logout = async (req, res, next) => {
    const deleteUserSessionResult = await Request.deleteUserSession(req.cookies['user-session']);

    if(!deleteUserSessionResult.result){
        console.log("로그아웃 실패!");
        return 0;
    }

    res.clearCookie('user-session');
    res.redirect('/');
};

/**
 * 메인 페이지, 자동 로그인 처리를 위해 AuthSrv로 토큰 검증, 유저 정보 요청
 */
exports.getMainPage = async (req, res, next) => {
    var userSessionID = req.cookies['user-session'];

    if(!userSessionID){
        console.log("/ (GET) : is not user session, login redirect");
        return res.render('main'); 
    }
    
    const getUserInfoResult = await Request.getUserInfo(userSessionID);
    if(!getUserInfoResult.result)
        res.render('main');
    else
        res.render('main', {id: getUserInfoResult.id, name: getUserInfoResult.name});
};