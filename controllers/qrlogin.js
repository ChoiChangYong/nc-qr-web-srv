var Request = require('../services').Request;

/**
 * QR코드 로그인 페이지
 */
exports.getLoginPage = (req, res, next) => {
    console.log("/qrcode (GET) : create qrcode");

    Request.requestQrcodeCreate((callback) => {
        if(callback.result)
            res.render('login_qrcode', {qrcode: callback.qrcode});
        else
            res.render('login_qrcode'); 
    });
};
