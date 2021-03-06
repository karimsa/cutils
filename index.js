/**
 * index.js - cutils
 * some utilities for the contest.
 *
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

module.exports = {
  // no side-effects functions
    fn: require('./lib/fn.js')
  , seal: require('./lib/seal.js')

  // some graph stuff
  , tree: require('./lib/graph/tree.js')
  , graph: require('./lib/graph/index.js')

  // stacks
  , stack: require('./lib/stack.js')
  , priority: require('./lib/priority.js')

  // a useful tool to handle i/o for solution
  // writing; see README.md
  , describe: require('./lib/io.js')

  // adding these things to the prototype slows
  // things down too much; and these are speedier
  // implementations
  , dup: require('./lib/dup.js')
  , startsWith: require('./lib/strings/startsWith.js')
}
