/**
 * lib/fn.js
 * function result caching for recursive functions
 * 
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

var crypto = require('crypto')
  , slice = Array.prototype.slice
  , hash = function (str) {
      var checksum = crypto.createHash('md5')
      return (checksum.update(str), checksum.digest('utf8'))
    }

module.exports = function (fn, ctx) {
  var cache = {}
  ctx = ctx || global

  return function () {
    var args = slice.call(arguments)
      , sarg = JSON.stringify(args[0])

    if (args.length > 1) {
      sarg = JSON.stringify(args)

      if (sarg.length > 32) {
        sarg = hash(sarg)
      }
    }

    if (cache.hasOwnProperty(sarg)) {
      return cache[sarg]
    }

    return (cache[sarg] = fn.apply(ctx, args))
  }
}
