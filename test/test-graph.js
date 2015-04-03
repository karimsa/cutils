var _ = require('../')
var test = require('tape')

test('test graphs', function (t) {
  t.plan(4)

  var G = _.graph()

  G.edge('A','B').edge('B','C').edge('C','A')

  t.equal(G.size(), 3, 'create edges')
  t.equal(G.order(), 3, 'auto-create vertices')

  var H = G.delete('A')

  t.equal(H.order(), 2, 'deleted vertex')
  t.equal(H.size(), 1, 'deleted all related edges')
})
