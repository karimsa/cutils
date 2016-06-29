/**
 * lib/dup.js
 * duplicate arrays or strings.
 * 
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

module.exports = function (thing, times) {
  var ret = thing

  if (thing instanceof Array) {
    while (-- times) ret = ret.concat(thing)
  } else {
    thing = String(thing)
    while (-- times) ret += thing
  }

  return ret
}
