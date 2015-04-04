/**
 * lib/graph/kruskal.js
 * Kruskal's algorithm.
 *
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

"use strict";

module.exports = function () {
  var G = this
    , H = new G.__proto__.constructor()
    , edges = G.edges.slice()

  while (H.size() < (G.order() - 1)) {
    // look for shortest edge
    var min = [-1,{a:'',b:'',weight:Infinity}]
    for (var i = 0; i < edges.length; i += 1) {
      if (edges[i] && edges[i].weight < min[1].weight) {
        min = [i,edges[i]]
      }
    }

    // validate it: does it complete a cycle?
    if (!H.walk(min[1].a, min[1].b)) {
      // add it to the graph
      H.edge(min[1].a, min[1].b, min[1].weight)
    }

    // remove it from the list
    delete edges[min[0]]
  }

  return H
}
