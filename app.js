var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
require('dotenv').config()
const passport = require("passport");
const mongoose = require("mongoose");

// The heroku url is: https://tranquil-chamber-01253.herokuapp.com/
//Please press sign in with google:(

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log(`1`);

app.use("/", indexRouter);
app.use("/users", usersRouter);

console.log(`2`);


app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "abc",
  })
);

app.use(passport.initialize());
app.use(passport.session());


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


passport.serializeUser(function (user, callback) {

  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {

  callback(null, obj);
});

mongoose.connect("mongodb://localhost/lab10", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = app;
