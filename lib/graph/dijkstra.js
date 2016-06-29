/**
 * lib/graph/dijkstra.js
 * Dijkstra's algorithm.
 *
 * Copyright (C) 2015 Karim Alibhai.
 **/

"use strict";

module.exports = function (start, end) {
  // default to first and last vertices added
  // to the stack
  start = start || this.vertices[0]
  end = end || this.vertices[this.vertices.length - 1]

  // if there's no possible walk, then
  // there's no point of trying
  if (!this.walk(start, end)) return null

  // remove first vertex from the graph
  var G = this
    , result = {
          walk: []
        , edges: []
      }
    , edges = []
    , vertices = {}
    , before = {}
    , last = start
    , weight = 0
    , dest
    , min
    , i

  // set first vertex value to 0
  vertices[start] = 0
  before[start] = 0

  // determine best weights
  while (last && last !== end) {
    min = G.min(G.edges.filter(function (edge) {
      if (edge.a === last || edge.b === last) {
        dest = edge.a === last ? edge.b : edge.a

        if (!vertices.hasOwnProperty(dest) || vertices[dest] > (edge.weight + vertices[last])) {
          vertices[dest] = edge.weight + vertices[last]
          before[dest] = last
        }

        return true
      }

      return false
    }))

    edges.push(min[1])
    G = G.delete(last)
    last = min[1].a === last ? min[1].b : min[1].a
  }

  // find final path
  last = end
  while (last !== 0) {
    for (i = 0; i < this.edges.length; i += 1) {
      if ((this.edges[i].a === last && this.edges[i].b === before[last]) || (this.edges[i].a === before[last] && this.edges[i].b === last)) {
        result.edges.push(this.edges[i])
        break
      }
    }

    result.walk.push(last)
    last = before[last]
  }

  // find first edge
  for (i = 0; i < this.edges.length; i += 1) {
    if ((this.edges[i].a === start && this.edges[i].b === result.walk[1]) || (this.edges[i].a === result.walk[1] && this.edges[i].b === start)) {
      result.edges.push(this.edges[i])
      break
    }
  }

  result.walk = result.walk.reverse()
  result.edges = result.edges.reverse()

  // the total weight of the path
  // would be the weight to the end
  // vertex (since that is the destination)
  result.weight = vertices[end]
  return result
}
