"use strict";
var questions = {
  name : function () {
    console.log('what is your name?');
  },
  age : function () {
    console.log('how old are you?');
  },
  color : function () {
    console.log('what is your favourite color?');
  },
  hobby : function () {
    console.log('what is your favourite hobby?');
  }
};

exports["default"] = questions;