var _ = require('../')
var test = require('tape')

test('simple Dijkstra\'s test', function (t) {
  var r, g = _.graph()

  _.seal(
   g.edge('a', 'b', 4)
    .edge('b', 'c', 3)
    .edge('c', 'd', 13)
    .edge('d', 'e', 2)
    .edge('e', 'f', 6)
    .edge('f', 'a', 10)
    .edge('a', 'g', 8)
    .edge('b', 'g', 2)
    .edge('c', 'g', 8)
    .edge('d', 'g', 15)
    .edge('e', 'g', 11)
    .edge('f', 'g', 4)
  )

  r = g.algo('dijkstra')('a', 'd')

  t.equal(r.weight, 18, 'reached proper minimum weight')
  t.equal(r.edges.length, 3, 'traversed right amount of edges')
  t.equal(r.walk.length, 4, 'visited right amount of vertices')

  t.end()
})
