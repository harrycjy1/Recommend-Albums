var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swig = require('swig');

//인덱스 컨트롤러
var index = require('./controllers/index');
var bands=require('./controllers/band');
var users = require('./controllers/user');

var app = express();

//swig로 템플릿엔진 교체


// view engine setup
//views구성에 변화가 있으니 경로를 변경
app.set('views', path.join(__dirname, 'views/pages'));

var swig= new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Defining routes and cotrollers functions
app.get('/', index.show);
// Defining route to list and post
app.get('/bands', bands.list);
// Get band by ID
app.get('/band/:id', bands.byId);
// Create band
app.post('/bands', bands.create);
// Update
app.put('/band/:id', bands.update);
// Delete by id
app.delete('/band/:id', bands.delete);
// Defining route to list and post users
app.get('/users', users.list);
app.post('/users', users.create);

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
