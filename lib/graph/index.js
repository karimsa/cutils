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
}, fn = require('../fn.js')

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

// .rm([start], [end], [weight])
// delete a particular edge
Graph.prototype.rm = function (start, end, weight) {
  var G = new Graph()
  G.fromJSON(this.toJSON())

  G.edges = G.edges.filter(function (edge) {
    return !(edge.a === start && edge.b === end && edge.weight === weight)
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

// .edgesOf([vertex])
// gets all edges related to 'vertex'
Graph.prototype.edgesOf = function (vertex) {
  return this.edges.filter(function (edge) {
    return edge.a === vertex || edge.b === vertex
  })
}

// .deg([vertex]
// gets the degree of a given vertex
Graph.prototype.deg = function (vertex) {
  return this.edgesOf(vertex).length
}

// .min([edges])
// find the minimum weighted edge in
// a given edge set
Graph.prototype.min = function (edges) {
  var min = [-1,{weight:Infinity}]
    , i

  for (i = 0; i < edges.length; i += 1) {
    if (edges[i] && edges[i].weight < min[1].weight) {
      min = [i,edges[i]]
    }
  }

  return min
}

// .algo([algorithm])
// create the respestive algorithm
Graph.prototype.algo = function (name) {
  if (!algorithms.hasOwnProperty(name)) {
    throw new Error('unknown algorithm')
  }

  return fn(algorithms[name], this)
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

// .matrix([type])
// get the respective matrix of the graph
Graph.prototype.matrix = function (type) {
  switch (type) {
  case 'adjacency':
    var matrix = []
      , e = this.edges
      , v = this.vertices
      , l = v.length
      , x
      , y

    for (x = 0; x < l; x += 1) {
      matrix.push([])

      for (y = 0; y < l; y += 1) {
        matrix[x].push(e.filter(function (edge) {
          return (edge.a === v[x] && edge.b === v[y]) || (edge.a === v[y] && edge.b === v[x])
        }).length)
      }
    }

    return matrix

  default:
    return null
  }
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
