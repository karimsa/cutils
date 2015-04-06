/**
 * lib/io.js
 * handle all i/o for a solution.
 * 
 * Copyright (C) 2015 Karim Alibhai.
 * Copyright (C) 2015 Valen Varangu Booth.
 **/

var fs = require('fs')
  , path = require('path')
  , map = require('map-stream')
  , streamify = require('stream-array')
  , EventEmitter = require('events').EventEmitter
  , formats = {
       '%w': String
     , '%d': function (str) {
         return parseInt(str, 10)
       }
     , '%f': function (str) {
         return parseFloat(str)
       }
    }
  , start

module.exports = function (sol) {
  var evts = new EventEmitter()

  // info about the problem, so
  // we can format the filename appropriately
  sol.num = sol.num || 1
  sol.try = sol.try || 1

  // by default, the io will assume
  // that you wish to lead line by line
  // as strings
  sol.format = (sol.format || ['%s']).map(function (line) {
    return line.split(/\s+/g)
  })

  // the logic is the only thing that cannot
  // have a default; this throw allows us to remember
  // the name of the property where the logic goes, in
  // the event that we forget
  if (typeof sol.fn !== 'function') {
    throw new Error('please at least specify some logic.')
  }

  // transform the logic into a stream
  sol.logic = map(sol.fn)

  // give preference to a given filename and location
  sol.dir = sol.dir || '.'
  sol.file = sol.file || ('DATA' + sol.num + sol.try + '.txt')

  // read in the file, and escape on any errors
  fs.readFile(path.resolve(sol.dir, sol.file), 'utf8', function (err, data) {
    if (err) {
      throw err
    }

    var input = [], acase, line, x, y, z, i, t

    // trim off any trailing or leading spaces,
    // and split by universal newline
    data = data.trim().split(/\r?\n/g)

    // format and split
    for (x = 0, z = 0, acase = [], line = []; x < data.length; x += 1, z += 1, line = []) {
      for (y = 0; data[x].length > 0 && y < sol.format[z].length; y += 1) {
        // '%s' means rest of line, nothing less
        // use '%w' for a single word
        if (sol.format[z][y] === '%s') {
          line.push(data[x])
          data[x] = ''
        } else if (sol.format[z][y] === '%n') {
          t = data[x].indexOf(' ')

          var N = parseInt(data[x].substr(0, t === -1 ? data[x].length : t), 10)
          for (i = 0; i < (N - 1); i += 1) {
            sol.format.push(sol.format[z + 1])
          }

          if (t === -1) data[x] = ''
          else data[x] = data[x].substr(t + 1)
        } else {
          t = data[x].indexOf(' ')
          line.push(formats[sol.format[z][y]](data[x].substr(0, t === -1 ? data[x].length : t)))

          if (t === -1) data[x] = ''
          else data[x] = data[x].substr(t + 1)
        }
      }

      // collect formatted data
      if (line.length > 0) {
        acase.push(line)
      }

      // when we reach the max of the given format
      // knowledge, assume that this is the end of
      // a case
      if (z === (sol.format.length - 1)) {
        input.push(acase)
        acase = []
        z = -1
      }
    }

    // prepare for end
    sol.logic.on('end', function () {
      var time = (+new Date()) - start
      if (time > 60000) {
        console.log('solution took too long: %sms', time)
      }

      evts.emit('end')
      if (sol.exit !== false) process.exit(0)
    })

    // start the logic
    streamify(input).pipe(sol.logic)
  })

  return evts
}
