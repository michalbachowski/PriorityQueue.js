Description
===========

Ever need a simple priority queue? I sure as hell did. JavaScript doesn't make sharing code easy, so I'm going the extra mile to bring you this: PriorityQueue.js. [![Build Status](https://travis-ci.org/michalbachowski/PriorityQueue.js.png?branch=master)](https://travis-ci.org/michalbachowski/PriorityQueue.js)

Features
--------

* Simple to use and understand.
* Creates a single PriorityQueue constructor.
* Instantiate via `PriorityQueue();` or `new PriorityQueue();`
* Offers both highest first and lowest first ordering.
* Test suite included.

The default is highest priority first, but when doing something like A\* you want lowest priority first... it handles it: `queue = PriorityQueue({low: true});` Boom!

Example Usage
------------

```javascript
var PriorityQueue = require('priority-queue');

// Highest priority first
var queue = PriorityQueue();

queue.push("b", 5);
queue.push("a", 10);

queue.pop(); // => "a"
queue.pop(); // => "b"

// Lowest priority first
var queue = PriorityQueue({low: true});

queue.push("x", 5);
queue.push("y", 10);

queue.pop(); // => "x"
queue.pop(); // => "y"
```

License
-------

MIT
