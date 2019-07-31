var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var mainRouter = require('./routes/main');

var app = express();

var Request = require('./services').Request;

const fs = require('fs');
const options = {
	key: fs.readFileSync('./keys/private.pem'),
	cert: fs.readFileSync('./keys/public.pem')
};

var socket_server = require('https').createServer(options, app);
var io = require('socket.io')(socket_server);
socket_server.listen(3002, function() {
  console.log("HTTPS socket_server listening on port " + 3002);
});

var instanceId;
var qrSocket = io.on('connection', function (socket) {
  console.log('socket connect');

  instanceId = socket.id;
  
  Request.createQrcode(instanceId, (callback) => {
    if(callback.result){
      qrSocket.to(instanceId).emit('qrcode', {
        qrcode: callback.qrcode,
        instanceId: instanceId
      });
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* GET QR-Code login page */
app.get('/login/qrcode', function(req, res, next) {
  res.render('login_qrcode');
});

/* POST qrcode-auth (Auth Server -> this) */
app.post('/qrcode-auth', function(req, res, next) {
  var request = {
    userSessionID: req.body.userSessionID,
    instanceId: req.body.instanceId
  };
  console.log('request.userSessionID : '+request.userSessionID);
  console.log('request.instanceId : '+request.instanceId);

  qrSocket.to(request.instanceId).emit('auth', {
    userSessionID: request.userSessionID
  });
  
  res.json({result: 1});
});

app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.io.on('connection', function(socket){
//   console.log('socket io user connected...');
// });

module.exports = app;
