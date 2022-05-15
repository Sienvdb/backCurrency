var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./passport/passport');

var indexRouter = require('./routes/index');
var leaderboardRouter = require('./routes/leaderboard');
var transferRouter = require('./routes/transfer');
var transfersRouter = require('./routes/transfers');
var usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/currencyapp');
var app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', usersRouter );
app.use('/', indexRouter);
app.use('/api/v1/leaderboard', leaderboardRouter);
app.use('/api/v1/transfer', transferRouter);
app.use('/api/v1/transfers', passport.authenticate('jwt', {session: false}), transfersRouter);
app.use('/api/v1/users', usersRouter);

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
