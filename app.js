var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
var qrcode = require('qrcode');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');

var app = express();

const fs = require('fs');
const options = {
	key: fs.readFileSync('./keys/private.pem'),
	cert: fs.readFileSync('./keys/public.pem')
};

var socket_server = require('https').createServer(options, app);
var io = require('socket.io')(socket_server);
socket_server.listen(3000, function() {
  console.log("HTTPS socket_server listening on port " + 3000);
});

var instanceId;
io.on('connection', function (socket) {
  console.log('socket connect');

  instanceId = socket.id;
  socket.on('msg', function (data) {
    console.log(data);
    socket.emit('recMsg', {comment: instanceId});
  });
  // io.to(instanceId).emit('qrcode', {
  // });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);

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
