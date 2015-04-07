var test = require('tape')
var _ = require('../')

test('test io', function (t) {
  var st = +new Date
  t.plan(20)

  t.throws(function () {
    _.describe({})
  }, false, 'logic-less implementation throws')

  _.describe({
    num: 4,
    try: 2,
    dir: __dirname,
    exit: false,
    format: [
      '%n',
      '%d %w %f %s'
    ],
    fn: function (inputs, next) {
      // keep only first line
      var input, i

      console.log(inputs)
      for (i = 0; i < inputs.length; i += 1) {
        input = inputs[i]

        // test formatting
        t.ok(true, 'reached logic')
        t.equal(input.length, 4, 'proper input length')
        t.equal(typeof input[0], 'number', 'first value is a number')
        t.equal(typeof input[1], 'string', 'second value is a string')
        t.equal(input[1].indexOf(' '), -1, 'second value has no spaces')
        t.equal(typeof input[2], 'number', 'third value is a number')
        t.notEqual(Math.floor(input[2]), input[2], 'third value is a float')
        t.equal(typeof input[3], 'string', 'fourth value is a string')
        t.notEqual(input[3].indexOf(' '), -1, 'fourth value has a space')
      }

      next()
    }
  }).on('end', t.end.bind(t))
})
