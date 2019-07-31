var path = require('path');

var serverIP = {
	'webSrv': 'http://localhost',
	'authSrv': 'http://localhost:3000',
	'qrcodeSrv': 'http://localhost:3001',
	// 'webSrvlocal': 'http://172.19.148.83',
	// 'authSrvlocal': 'http://172.19.148.51:3000',
	// 'qrcodeSrvlocal': 'http://172.19.148.232:3001'
}

var cookieExpireTime = 3*60*1000;   // 3분

module.exports = {
	'serverIP': serverIP,
	'cookieExpireTime': cookieExpireTime
}
