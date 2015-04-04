var _ = require('../')
var test = require('tape')

test('simple prim est', function (t) {
  var h, g = _.graph()

  _.seal(
   g.edge('a', 'b', 6)
    .edge('b', 'e', 8)
    .edge('e', 'f', 5)
    .edge('f', 'g', 2)
    .edge('g', 'd', 10)
    .edge('d', 'c', 5)
    .edge('c', 'a', 3)
    .edge('c', 'e', 5)
    .edge('e', 'd', 3)
    .edge('e', 'g', 4)
  )

  h = g.algo('prim')('a')

  t.equal(h.weight, 23, 'reached proper minimum weight')
  t.equal(h.order(), g.order(), 'maintained order')

  t.end()
})
