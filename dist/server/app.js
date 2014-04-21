"use strict";
var express = require('express');
var express_hbs  = require('express3-handlebars');

var app = express();

var hbs = express_hbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  //default locations anyway, but worth stating explicitly
  layoutsDir: "views/layouts/",
  //default location is views/partials/
  partialsDir: "views/includes/"
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//middleware - no need for this after migration to express 4
//app.use(app.router);

//routes
app.get('/', function(request, response){
  response.render('home');
});

//error handling for nginx 404 file not found
app.get('/errors/404', function(request, response) {
  response.render('error', {error: 'Error: 404 - File Not Found'});
});

//error handling for nginx 401 unauthorised
app.get('/errors/401', function(request, response) {
  response.render('error', {error: 'Error: 401 - Unauthorised'});
});

//error handling for nginx 403
app.get('/errors/403', function(request, response) {
  response.render('error', {error: 'Error: 403 - Forbidden'});
});

//error handling for nginx 500 internal server error
app.get('/errors/500', function(request, response) {
  response.render('error', {error: 'Error: 500 - Internal Server Error'});
});

//error handling for nginx 502 bad gateway
app.get('/errors/502', function(request, response) {
  response.render('error', {error: 'Error: 502 - Bad Gateway'});
});

//middleware, moved after routes due to changing from express 3 to 4
// Handle 404
app.use(function(req, res) {
  res.status(400);
    res.render('error', {error: 'Error: 404 - File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
    res.render('error', {error: error});
});

exports["default"] = app;