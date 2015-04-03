var test = require('tape')
var _ = require('../')

test('test io', function (t) {
  t.plan(14)

  _.describe({
    num: 4,
    try: 2,
    dir: __dirname,
    format: ['%d %w %s'],
    fn: function (input, next) {
      t.ok(true, 'reached logic')
      t.equal(input.length, 3, 'proper input length')
      t.equal(typeof input[0], 'number', 'first value is a number')
      t.equal(typeof input[1], 'string', 'second value is a string')
      t.equal(input[1].indexOf(' '), -1, 'second value has no spaces')
      t.equal(typeof input[2], 'string', 'third value is a string')
      t.notEqual(input[2].indexOf(' '), -1, 'third value has a space')

      next()
    }
  }).on('end', t.end.bind(t))
})
