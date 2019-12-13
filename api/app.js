var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors')
var jsonwt = require('jsonwebtoken')
var configJwt = require('./app/auth/config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var usuarioRotas = require('./app/rotas/usuarioRotas')
var registroRotas = require('./app/rotas/registroRotas')
var lancRotas = require('./app/rotas/lancRotas')
var docRotas = require('./app/rotas/docRotas')
var pagarRotas = require('./app/rotas/pagarRotas')
var contabRotas = require('./app/rotas/contabRotas')
var planoContasRotas = require('./app/rotas/planoContasRotas')
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

function verificaJWT(req, res, next) {
  var token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ status: false, msg: 'Você não tem um token válido!' })

  jsonwt.verify(token, configJwt.secretOrKey, function(err, decoded){
    if(err) return res.status(500).send({status: false, msg: 'Falha ao autenticar o token!' })

    req.usuarion = decoded.n
    next()
  })
}

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api/sistema/v1/usuario', verificaJWT, usuarioRotas)
app.use('/api/sistema/v1/registro', verificaJWT, registroRotas)
app.use('/api/sistema/v1/lanc', verificaJWT, lancRotas)
app.use('/api/sistema/v1/doc', docRotas)
app.use('/api/sistema/v1/pagar', pagarRotas)
app.use('/api/sistema/v1/contab', contabRotas)
app.use('/api/sistema/v1/planocontas', planoContasRotas)
app.use('/api/sistema/v1/usuarios', registrarUsuarioRotas)
app.use('/api/sistema/v1/login', loginUsuarioRotas)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
