/**
 * lib/graph/prim.js
 * Prim's algorithm.
 * 
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

"use strict";

module.exports = function (vertex) {
  var G = this
    , H = new G.__proto__.constructor()
    , edges = G.edges.slice()
    , min
    , i

  H.add(vertex)
  while (H.order() < G.order()) {
    min = G.min(edges.filter(function (edge, key) {
      if (edge) edge._k = key
      return edge && (H.vertices.indexOf(edge.a) !== -1 || H.vertices.indexOf(edge.b) !== -1)
    }))

    // only chose if no cycle exists
    if (!H.walk(min[1].a, min[1].b)) {
      H.edge(min[1].a, min[1].b, min[1].weight)
    }

    // stop considering this edge
    delete edges[min[1]._k]
  }

  return H
}
