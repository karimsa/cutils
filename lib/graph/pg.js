"use strict";

var fn = require('../fn.js')
  , priority = require('../priority.js')

module.exports = function (start, end) {
  start = String(start)
  end = String(end)

  var G = this
    , edgesOf = fn(G.edgesOf, G)
    , stack = priority('dist', function (a, b) {
        return (a - b) < 0
      })
    , visited = {}
    , node
    , dist
    , path

  stack.add({ node: start, dist: 0, path: [start] })

  while (true) {
    node = stack.first().node
    dist = stack.first().dist
    path = stack.first().path
    stack.pop()

    if (node === end) return {
        weight: dist
      , walk: path
    }

    if (!visited[node]) {
      edgesOf(node).forEach(function (edge) {
        var next = edge.a === node ? edge.b : edge.a

        if (!visited[next]) {
          //console.log('%s => %s [%s]', node, next, edge.weight)
          stack.add({ node: next, dist: dist + edge.weight, path: path.concat([node]) })
        }
      })

      visited[node] = true
    }
  }
}
