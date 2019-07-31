var Request = require('../services').Request;

/**
 * 회원가입 페이지
 */
exports.getJoinPage = (req, res, next) => {
    res.render('join', {title: 'Join'});
};

/**
 * 회원가입 버튼 클릭, Auth Server로 처리 요청
 */
exports.processJoin = (req, res, next) => {
    var user = {
        'id': req.body.id,
        'password': req.body.password,
        'name': req.body.name
    };

    Request.addUser(user, (callback) => {
        if(callback.result){
            res.redirect('/login');
        } else {
            res.render('join', {
                message: callback.message
            });
        }
    });
};
