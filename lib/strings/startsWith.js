/**
 * lib/strings/startsWith.js
 * a break-prefering startsWith() check.
 *
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

"use strict";

// _.strings.startsWith(A, B) should read as:
// 'does A start with B?'
// and therefore this function makes the assumption
// that B is shorter/of equal length

module.exports = function (a, b) {
  // conditionals execute faster
  if (a.length < b.length) return false;
  if (a.length === b.length) return a === b;

  // loop if we must, but prefer return
  for (var i = 0; i < b.length; i += 1) {
    if (a[i] !== b[i]) return false
  }

  // if we make it to here, then should
  // be true
  return true
}
