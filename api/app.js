var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var registroRotas = require('./app/rotas/registroRotas')
var lancRotas = require('./app/rotas/lancRotas')
var registrarUsuarioRotas = require('./app/rotas/registrarUsuarios')
var loginUsuarioRotas = require('./app/rotas/loginRotas')

var app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api/sistema/v1/registro', registroRotas)
app.use('/api/sistema/v1/lanc', lancRotas)
app.use('/api/sistema/v1/usuarios', registrarUsuarioRotas)
app.use('/api/sistema/v1/login', loginUsuarioRotas)

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

module.exports = app;
