var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./passport/passport');
const cors = require('cors');

var indexRouter = require('./routes/index');
var leaderboardRouter = require('./routes/leaderboard');
var transferRouter = require('./routes/transfer');
var transfersRouter = require('./routes/transfers');
var usersRouter = require('./routes/users');

mongoose.connect('mongodb+srv://adminCurrency:9876adminCurrency54321@backcurrency.rnyv1.mongodb.net/?retryWrites=true&w=majority');
var app = express();
const port = process.env.PORT || 3001;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/api/v1', usersRouter )
app.use('/', indexRouter);
app.use('/api/v1/leaderboard',passport.authenticate('jwt', {session: false}), leaderboardRouter);
app.use('/api/v1/transfer', passport.authenticate('jwt', {session: false}), transferRouter);
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
