# Contest UTILS [![Build Status](http://img.shields.io/travis/karimsa/cutils.svg?style=flat)](https://travis-ci.org/karimsa/cutils)

some utilities for the contest.

[![NPM](https://nodei.co/npm/cutils.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cutils/)

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
 - **exit**: setting this to false will stop the exiting of node when the full case file is processed. (default: true; useful for tests)
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

*Busting the cache: just pass a random value as an argument to the function you're calling. i.e. to bust the cache for the 5th fibonacci term, run: fib(5, 'random').*

## Stacks

Stacks are like arrays except they recept the LIFO rule.

### methods

 - **first()**: gets the first element off the stack (elm at [0]).
 - **last()**: gets the last element off the stack (elm at [length - 1]).
 - **pop()**: removes the first element off the stack. (returns the element)

*All other methods are carried down from the super class Array.*

## Priority Stacks

A priority stack (or queue) operates like a stack except that it keeps the stack sorted
at all times.

### constructor

The constructor takes two parameters: a key (optional) and a comparator (optional). The key is a static string key
of which property to sort by within the stack.

Example:

```javascript
var p = _.priority('age')

p.add({ age: 10, name: 'John' })
p.add({ age:  5, name: 'Jack' })
p.add({ age: 15, name: 'Jill' })

p.first() // should return { age: 15, name: 'Jill' }
```

The comparator must return true/false, and will receive two elements as parameters.

Example:

```javascript
var p = _.priority(undefined, function (a, b) {
  return (a - b) < 0
})

p.add(10)
p.add(5)
p.add(15)

p.first() // should be 5
```

### methods

 - **add(element)**: add an element and fix the order.

*All other methods are from Stack or Array.*

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

 - **vertices**: array of vertices in the graph.
 - **edges**: array of edges in the graph.
 - **weight**: the total weight of the tree. (irrelevant for non-tree graphs)

### methods

 - **add([name])**: create a new vertex. (returns graph)
 - **delete([vertex])**: create a graph with all vertices+edges except 'vertex'. (returns new graph)
 - **edge([vertex], [vertex], [weight])**: create a new edge [possibly weighted]. (returns graph)
 - **size()**: get the size of the graph. (returns number)
 - **order()**: get the order of the graph. (returns number)
 - **deg([vertex])**: calculate the degree of vertex 'vertex'. (returns number)
 - **edgesOf([vertex])**: get the edge set related to 'vertex'. (returns array)
 - **min([edges])**: find the minimum weighted edge in a set of edges. (returns array where [0] is the index of the edge and [1] is the edge)
 - **walk([from], [to])**: find a walk from one vertex to another; not always the shortest walk. (returns array of vertices to visit, or null if no
possible walk exists)
 - **algo([name])**: creates a callback for the given algorithm. (returns callback)
 - **matrix([type])**: get the respective matrix of the graph. (returns a square 2D array)

### algorithms

some graph theory algorithms for generalized usage. *all these methods are wrapped with a function cache, changing the graph after creating one of
these callbacks is pointless*.

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

Find a minimum weight spanning tree by greedy selecting lowest connected edge:

```javascript
var G = _.graph()
var P = G.algo('prim')

// creates a new graph with only
// smallest weighted edges - it will
// be a graph object but it is a tree
var T = P('vertex')
```

#### Dijkstra's

Find the shortest path between two vertices:

```javascript
var G = _.graph()
var D = G.algo('dijkstra')

// returns a result object that looks like this:
// {
//     walk: ['a', 'b', ...] // an array of vertices to walk through (in order)
//   , edges: [{ a: 'a', b: 'b', weight: 0 }, ...] // an array of edges to traverse to walk through (in order)
//   , weight: 0 // the total weight of the path
// }
// will return null if path is not possible
var path = D('A', 'B')
```

#### A*
