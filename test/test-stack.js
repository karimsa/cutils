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

  t.equal(p.first(), 13, 'first element is right')
  t.equal(p.last(), 4, 'last element is correct')

  t.equal(p.pop(), 13, 'pops off correct element')
  t.equal(p.first(), 7, 'next element is correct')

  t.end()
})
