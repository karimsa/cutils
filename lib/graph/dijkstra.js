/**
 * lib/graph/dijkstra.js
 * Dijkstra's algorithm.
 *
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
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
    , vertices = {}
    , last = start
    , weight = 0
    , dest
    , min
    , i

  // set first vertex value to 0
  vertices[start] = 0

  while (last !== end) {
    result.walk.push(last)
    min = G.min(G.edges.filter(function (edge) {
      if (edge.a === last || edge.b === last) {
        dest = edge.a === last ? edge.b : edge.a

        if (!vertices.hasOwnProperty(dest) || vertices[dest] > (edge.weight + vertices[last])) {
          vertices[dest] = edge.weight + vertices[last]
        }

        return true
      }

      return false
    }))

    result.edges.push(min[1])
    G = G.delete(last)
    last = min[1].a === last ? min[1].b : min[1].a
  }

  result.walk.push(end)

  // the total weight of the path
  // would be the weight to the end
  // vertex (since that is the destination)
  result.weight = vertices[end]
  return result
}
