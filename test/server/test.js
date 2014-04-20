"use strict";
var expect = require("expect.js");

var add = require("../../dist/server/add")['default'];


describe('add', function() {
  it('should expose a function', function() {
    expect(add).to.be.a('function');
  });
  it('should add the values', function() {
    expect(add(1, 3)).to.equal(4);
  });
  it('should add more values', function (){
    expect(add(7,6)).to.equal(13);
  })
});