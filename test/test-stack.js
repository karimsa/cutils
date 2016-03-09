var _ = require('../')
var test = require('tape')

test('test priority stack', function (t) {
  var p = _.stack()

  p.push(13)
  p.push(7)
  p.push(25)
  p.push(3)
  p.push(18)
  p.push(4)

  t.equal(p.first(), 4, 'first element is right')
  t.equal(p.last(), 13, 'last element is correct')

  t.equal(p.pop(), 4, 'pops off correct element')
  t.equal(p.first(), 18, 'next element is correct')

  t.end()
})
