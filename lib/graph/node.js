/**
 * node.js
 * the node of a tree.
 *
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

var Node = function (name) {
    this.nameProperty = name || null
    this.parentNode = null
    this.children = []
    this.pos = 0

    Object.defineProperty(this, 'size', {
        get: function () {
            return this.children.length
        }.bind(this)
    })
}

// .name([name])
// get/set the name of the current node
Node.prototype.name = function (name) {
    if (name) {
        this.nameProperty = name
        return this
    } else {
        return this.nameProperty
    }
}

// .parent([node])
// get/set the parent of the current node
Node.prototype.parent = function (parent) {
    if (parent !== undefined) {
        this.parentNode = parent
        return this
    } else {
        return this.parent
    }
}

// .add([node/nodes])
// adopt a new child(ren) node(s)
Node.prototype.add = function (nodes) {
    var that = this

    // prefer list
    if (!(nodes instanceof Array)) {
        nodes = [nodes]
    }

    // adopt all the children
    nodes.forEach(function (node) {
        // if child is not of the form node,
        // assume that it is a name to converted
        // into a node
        if (!(node instanceof Node)) {
            node = new Node(node)
        }

        // set the parent of the node
        node.parent(that)

        // set the order
        if (that.children.length > 0) {
            node.pos = that.children[that.size - 1].pos + 1
        }

        // adopt the child
        that.children.push(node)
    })

    return this
}

// .get([name])
// get a child node by name
Node.prototype.get = function (name) {
    return this.children.filter(function (node) {
        return node.name() === name
    })[0]
}

// .at(index)
// get a child from a specific location on the
// array
Node.prototype.at = function (i) {
    return this.children[i]
}

module.exports = Node
