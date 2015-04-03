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
       '%s': String
     , '%w': String
     , '%d': function (str) {
         return parseInt(str, 10)
       }
     , '%f': function (str) {
         return parseFloat(str)
       }
    }

module.exports = function (sol) {
  var start, evts = new EventEmitter()

  // info about the problem, so
  // we can format the filename appropriately
  sol.num = sol.num || 1;
  sol.try = sol.try || 1;

  // by default, the io will assume
  // that you wish to lead line by line
  // as strings
  sol.format = (sol.format || ['%s']).map(function (line) {
    return line.split(/\s+/g)
  });

  // the logic is the only thing that cannot
  // have a default; this throw allows us to remember
  // the name of the property where the logic goes, in
  // the event that we forget
  if (typeof sol.fn !== 'function') {
    throw new Error('please at least specify some logic.')
  }

  // transform the logic into a stream
  sol.logic = map(sol.fn);

  // give preference to a given filename and location
  sol.dir = sol.dir || '.';
  sol.file = sol.file || ('DATA' + sol.num + sol.try + '.txt')

  // read in the file, and escape on any errors
  fs.readFile(path.resolve(sol.dir, sol.file), 'utf8', function (err, data) {
    if (err) {
      throw err
    }

    var input = [], acase, line, x, y, z

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
        } else {
          line.push(formats[sol.format[z][y]](data[x].substr(0, data[x].indexOf(' '))))
          data[x] = data[x].substr(data[x].indexOf(' ') + 1)
        }
      }

      // collect formatted data
      acase.push(line)

      // when we reach the max of the given format
      // knowledge, assume that this is the end of
      // a case
      if (z === (sol.format.length - 1)) {
        input.push(acase)
        acase = []
        z = -1
      }
    }

    // start a timer to check for too long solution
    start = +new Date()
    setInterval(function () {
      var time = +new Date()

      if ((time - start) > 60000) {
        throw new Error('solution took too long: ' + (time - START_TIME) + 'ms');
      }
    }, 16);

    // prepare for end
    sol.logic.on('end', function () {
      evts.emit('end')
      process.exit(0)
    })

    // start the logic
    streamify(input).pipe(sol.logic)
  })

  return evts
}
