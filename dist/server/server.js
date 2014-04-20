"use strict";
var app = require("./app")["default"];


var server = function () {
  app.listen(5000);
  console.log('Listening on port 5000');
}

exports["default"] = server;