# Contest UTILS

some utilities for the contest.

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
