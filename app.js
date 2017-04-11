'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('hbs');
var csrf = require('csurf'); // how to use csrf in express @ https://medium.com/@liazheng/cross-site-request-forgery-prevention-w-node-js-d9d2cac54772#.n1ww3qrxe
var fs = require('fs');

var contentful = require('./app/server/services/contentful')

var app = express();



// view engine setup
app.set('views', path.join(__dirname, './app/server/views/'));
app.set('view engine', 'hbs');

// register Handlebars view templating partials && helpers
hbs.registerPartials(__dirname + '/app/server/views/partials/');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// setup route middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'S3CRE7',
  resave: true,
  saveUninitialized: true
}));

// Use csrf
app.use(csrf())

// Install CSRF
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());

  res.locals.csrfToken = encodeURIComponent(req.csrfToken())
  next();
})


// Serve static assets
app.use(express.static(path.join(__dirname, './app/public/build/')));

// Mount routes
var routes = require('./app/server/routes/index')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
