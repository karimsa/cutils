// fn-cache.js
// basic caching wrapper for functions
//
// example usage:
//
// var fib = function (n) {
//   if (n === 1 || n === 2) { 
//     return 1;
//   }
//   return fib(n - 1) + fib(n - 2);
// }
//
// the classic Fibonacci function ^
// it's simple, but not the slightest bit
// useful. to make it a bit more useful:
// 
// var fn = require('fn-cache')
// var fib = fn(function (n) {
//   if (n === 1 || n === 2) {
//     return 1;
//   }
//   return fib(n - 1) + fib(n - 2);
// })
//
// difference: you wrap the recursive function
// with this simple trick, and it drastically
// improves performance.
//
// Created by: Karim Alibhai
// Licensed under MIT license.

var crypto = require('crypto')
  , slice = Array.prototype.slice
  , hash = function (str) {
      var checksum = crypto.createHash('md5')
      return (checksum.update(str), checksum.digest('utf8'))
    }

module.exports = function (fn, ctx) {
  var cache = {}
  ctx = ctx || global;

  return function () {
    var args = slice.call(arguments)
      , sarg = String(args[0])

    if (args.length > 1) {
      sarg = args.join()

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
