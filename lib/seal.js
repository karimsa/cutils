/**
 * lib/seal.js
 * force all methods of an object to become
 * cached and have no side-effects.
 *
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

var fn = require('./fn.js')

module.exports = function (object) {
  for (var i in object) {
    if (typeof object[i] === 'function') {
      object[i] = fn(object[i], object)
    }
  }

  return object
}
