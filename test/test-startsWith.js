var _ = require('../')
var test = require('tape')

test('test string#startsWith', function (t) {
  t.ok(_.startsWith('abcdefghijklmnopqrstuvwxyz', 'abcdefgh'), 'alphabet starts with abcdefgh')
  t.ok(!_.startsWith('abcdefghijklmnopqrstuvwxyz', 'abcdefhg'), 'alphabet does not start with abcdefhg')
  t.ok(!_.startsWith('abcdefgh', 'abcdefghijklmnopqrstuvwxyz'), 'abcdefgh does not start with alphabet')
  t.ok(_.startsWith('abcd', 'abcd'), 'abcd starts with abcd')

  t.end()
})
