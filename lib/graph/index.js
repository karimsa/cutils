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
  this.weight = 0
}, algorithms = {
    'a*': require('./astar.js')
  , 'dijkstra': require('./dijkstra.js')
  , 'kruskal': require('./kruskal.js')
  , 'prim': require('./prim.js')
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

// .walk([vertex], [vertex], [edge list])
// try to find a walk from vertex to vertex
Graph.prototype.walk = function (a, b, graph) {
  graph = graph || this.edges

  var visited = []
    , edges = []
    , i
    , w

  for (i = 0; i < graph.length; i += 1) {
    if (graph[i].a === a || graph[i].b === a) {
      if (graph[i].a === b || graph[i].b === b) return [a,b]
      visited.push(graph[i].a === a ? graph[i].b : graph[i].a)
    } else {
      edges.push(graph[i])
    }
  }

  for (i = 0; i < visited.length; i += 1) {
    w = this.walk(visited[i], b, edges)
    if (w) {
      return [a].concat(w)
    }
  }

  return null
}

// .algo([algorithm])
// create the respestive algorithm
Graph.prototype.algo = function (name) {
  if (!algorithms.hasOwnProperty(name)) {
    throw new Error('unknown algorithm')
  }

  return algorithms[name].bind(this)
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

  this.weight += weight || 0
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
  return {
      vertices: this.vertices
    , edges: this.edges
  }
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
