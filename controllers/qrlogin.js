var Request = require('../services').Request;

/**
 * QR코드 로그인 페이지
 */
exports.getLoginPage = async (req, res, next) => {
    console.log("/qrcode (GET) : create qrcode");

    const createQrcodeResult = await Request.createQrcode();
    if(createQrcodeResult.result)
        res.render('login_qrcode', {qrcode: createQrcodeResult.qrcode});
    else
        res.render('login_qrcode'); 
};

