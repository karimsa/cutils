var _ = require('../')
var test = require('tape')

test('test adjacency matrix', function (t) {
  var m, x, y, g = _.graph()

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

  m = g.matrix('adjacency')

  t.plan((m.length * m.length) + 2)

  t.equal(m.length, m[2].length, 'is square')
  t.equal(m.length, g.order(), 'maintains order')

  for (x = 0; x < m.length; x += 1) {
    for (y = 0; y < m.length; y += 1) {
      t.ok(m[x][y] === 0 || m[x][y] === 1, 'value (' + x + ',' + y + ') is proper')
    }
  }
})
