var _ = require('../')
var test = require('tape')

test('test priority stack', function (t) {
  var p = _.priority()

  p.add(13)
  p.add(7)
  p.add(25)
  p.add(3)
  p.add(18)
  p.add(4)

  t.equal(p.first(), 25, 'first element is right')
  t.equal(p.last(), 3, 'last element is correct')

  t.equal(p.pop(), 25, 'pops off correct element')
  t.equal(p.first(), 18, 'next element is correct')

  t.end()
})
