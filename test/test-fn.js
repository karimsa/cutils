var test = require('tape')
var _ = require('../')

var time = function () { return +new Date }
var f = function (n) {
  if ( n === 1 || n === 2 ) return 1;
  return f(n - 1) + f(n - 2);
}


test('test Fibonacci timing', function (t) {
  t.plan(1)
  var N = Math.floor((Math.random() * 10) + 30)

  var s = time()
  f(N)
  var tt = time() - s

  f = _.fn(f)

  var sn = time()
  f(N)
  var ttn = time() - sn

  console.log('first time: %sms\nsecond time: %sms', tt, ttn)
  t.ok(tt > ttn, 'wrapper is faster')
})
