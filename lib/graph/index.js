/**
 * graph.js
 * all things graphs.
 *
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

"use strict";

var Graph = function () {
  this.vertices = []
  this.edges = []
}

// .add([name])
// adds a new vertex with label [name]
Graph.prototype.add = function (vertex) {
  this.vertices.push(vertex)
  return this
}

// .delete([vertex])
// returns a new graph without vertex [vertex]
Graph.prototype.delete = function (vertex) {
  // clone graph
  var G = new Graph()
  G.fromJSON(this.toJSON())

  // delete vertex
  G.vertices = G.vertices.filter(function (v) {
    return v !== vertex
  })

  // delete edges
  G.edges = G.edges.filter(function (e) {
    return e.a !== vertex && e.b !== vertex
  })

  return G
}

// .edge([start], [end], [weight])
// adds a new edge between [start] and [end]
// of weight [weight]
Graph.prototype.edge = function (a, b, weight) {
  if (this.vertices.indexOf(a) === -1) {
    this.add(a)
  }

  if (this.vertices.indexOf(b) === -1) {
    this.add(b)
  }

  this.edges.push({
      a: a
    , b: b
    , weight: weight || 0
  })

  return this
}

// .size()
// get the size of the graph
Graph.prototype.size = function () {
  return this.edges.length
}

// .order()
// get the order of the graph
Graph.prototype.order = function () {
  return this.vertices.length
}

// .toJSON()
// serialization to json
Graph.prototype.toJSON = function () {
  return JSON.stringify({
      vertices: this.vertices
    , edges: this.edges
  })
}

// .fromJSON([json])
// serialization from json
Graph.prototype.fromJSON = function (json) {
  json = typeof json === 'object' ? json : JSON.parse(json)

  this.vertices = json.vertices
  this.edges = json.edges

  return this
}

module.exports = function () {
  return new Graph()
}
