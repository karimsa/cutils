# Contest UTILS

some utilities for the contest.

## I/O

A utility for auto-parsing and reading data is built into cutils for quick
solution building. The logic function will be transformed into a [map-stream](https://github.com/dominictarr/map-stream),
and therefore you should code it like so.

Example:

```javascript
var _ = require('cutils')
_.describe({ /* options */ })
```

Available options:

 - **num**: the number of the problem. (1-4; default: 1)
 - **try**: the number of the try. (1/2; default: 1)
 - **file**: the exact filename of the data file. (default: DATA[num][try].txt; specify for override)
 - **dir**: the path to the directory in which the data file is stored. (default: ./; specify for override)
 - **format**: an array specifying how to format the input. each item in the array is treated as a line of input, every modifier must be preceeded with '%' and any unknown modifiers will cause an error. the formatting modifiers include: s (rest of line as a string), w (single word as a string), d (single word as a base 10 integer), and f (single word as a float). (default: ['%s'])
 - **fn**: a function containing your solving logic. it will be passed two parameters, an array of arrays formatted data and a callback. (no defaults, therefore an exception will be thrown if this is not given)

Formatting example:

./DATA12.txt
```
one 2 three
4.0 five 6.01
```

s1.js
```javascript
_.describe({
  num: 1,
  try: 2,
  format: [
    '%w %d %w',
    '%f %w %f'
  ],
  fn: function (line, next) {
    // line[0] = ['one',2,'three']
    // line[1] = [4.0,'five',6.01]
  }
})
```

## Recursion

### Computation Expense

Recursion algorithms can get really expensive (time consuming) really easily,
and aside from maximizing the number of special cases in the algorithm, the easiest
and perhaps best workaround is to cache all results (and therefore treat the function
as a mathematical function).

Example:

```javascript
// import the utilities
var _ = require('cutils')

// simple Fibonacci function
var fib = function (n) {
  if ( n === 1 || n === 2 ) return 1;
  return fib ( n - 1 ) + fib ( n - 2 );
}

// wrap it off
fib = _.R.fn(fib);
```

## Trees

.. stuff to come ..
