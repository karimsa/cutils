/**
 * index.js - cutils
 * some utilities for the contest.
 *
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

"use strict";

module.exports = {
  // recursion utils
    R: {
      fn: require('./lib/R/fn.js')
    }

  // some graph stuff
  , tree: require('./lib/graph/tree.js')
  , graph: require('./lib/graph/index.js')

  // a useful tool to handle i/o for solution
  // writing; see README.md
  , describe: require('./lib/io.js')

  // adding these things to the prototype slows
  // things down too much; and these are speedier
  // implementations
  , strings: {
      startsWith: require('./lib/strings/startsWith.js')
    }
}
