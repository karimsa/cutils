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

## No Side-Effect Functions

Recursion algorithms can get really expensive (time consuming) really easily,
and aside from maximizing the number of special cases in the algorithm, the easiest
and perhaps best workaround is to cache all results (and therefore treat the function
as a mathematical function; one with no side effects).

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
fib = _.fn(fib);
```

Sometimes this strategy can be helpful with entire objects too, such as when you construct
a new graph and are about to start running algorithms on it. If your class has been programmed
for no side-effects (assuming that important factors such as the graph vertices and edges remains
consistent), then it may help to "seal" the class' methods with their own caches:

Example:

```javascript
var _ = require('cutils')
var g = _.graph()

// create your graph
g
  .edge('a', 'b')
  .edge('b', 'c')
  .edge('c', 'a')

// seal it
_.seal(g)

// now run your algorithms
var walk = g.walk('a', 'c')
```

## Graph Theory

Graphs are pretty simple structures in this utility set; you just create them, and add vertices and
edges. If you add an edge, any related vertices that have not yet been added will be added automatically.

```javascript
var _ = require('cutils')
var g = _.graph()

// this:
g.add('a')
g.add('b')
g.edge('a', 'b', 5)

// is the same as this:
g.edge('a', 'b', 5)
```

### properties

 - **weight**: the total weight of the tree. (irrelevant for non-tree graphs)

### methods

 - **add([name])**: create a new vertex. (returns graph)
 - **edge([vertex], [vertex], [weight])**: create a new edge [possibly weighted]. (returns graph)
 - **walk([from], [to])**: find a walk from one vertex to another; not always the shortest walk. (returns array of vertices to visit, or null if no possible walk exists)
 - **algo([name])**: creates a callback for the given algorithm. (returns callback)

### algorithms

some graph theory algorithms for generalized usage. *all these methods are wrapped with a function cache with no way to bust the cache; changing the graph
after creating one of these callbacks is pointless*.

#### Kruskal's

Find a minimum weight spanning tree by greedy selecting lowest edge:

```javascript
var G = _.graph()
var K = G.algo('kruskal')

// creates a new graph with only
// smallest weighted edges - it will
// be a graph object but it is a tree
var T = K()
```

#### Prim's

#### Dijkstra's

#### A*
