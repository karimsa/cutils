/**
 * lib/stack.js
 * a LIFO extension of JS arrays.
 *
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

"use strict";

var Stack = function () {}

// this helps maintain all array
// traits
Stack.prototype = []

// .first()
// grab first element
Stack.prototype.first = function () {
  return this[0]
}

// .last()
// grab last element
Stack.prototype.last = function () {
  return this[this.length - 1]
}

// .pop()
// pop off the last element, and return
// it
Stack.prototype.pop = function () {
  return this.splice(0, 1)[0]
}

module.exports = function () {
  return new Stack()
}
