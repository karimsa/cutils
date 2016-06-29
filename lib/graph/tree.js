/**
 * tree.js
 * a way to think trees.
 *
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

var Node = require('./node.js')
  , Tree = function (from) {
      this.root(from)
    }
  , expose = function (prop) {
      return function () {
        return this.rootNode[prop].apply(this.rootNode, arguments)
      }
    }
  , i

// .root()
// get/set the root node of the tree
Tree.prototype.root = function (node) {
    if (node) {
        this.rootNode = node || null

        if (this.rootNode && !(this.rootNode instanceof Node)) {
            this.rootNode = new Node(this.rootNode)
        }

        return this
    } else {
        return this.rootNode
    }
};

// copy all the node properties
for (i in Node.prototype) {
    if (Node.prototype.hasOwnProperty(i)) {
        Tree.prototype[i] = expose(i)
    }
}

// expose
module.exports = function (a) {
  return new Tree(a)
}
