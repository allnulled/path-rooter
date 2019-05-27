# path-rooter

Set of utilities that combine glob patterns and node (fresh) imports from a root path.

## Explanation

This tool can do 6 things via 6 methods:

   - `rooter.resolve`: Build paths from a root path and the parts.
   - `rooter.require`: Import files from a root path and the parts.
   - `rooter.execute`: Execute files from a root path and the parts.
   - `rooter.find`: Find files from a root path and a set of `glob` patterns.
   - `rooter.findAndRequire`: Import files from a root path and a set of `glob` patterns.
   - `rooter.findAndExecute`: Execute files from a root path and a set of `glob` patterns.

## Installation

`$ npm i -s path-rooter`

## Usage

##### Import the module and create an instance:

```js
const Rooter = require("path-rooter");
const rooter = Rooter.create(__dirname+"/..");
```

##### Build 1 route:

```js
const route = rooter.resolve("/subpath/to/somewhere", "and/using", "parts.js");
```

##### Import using cache:

```js
const data = rooter.require("/subpath", "to", "somefile.js");
```

##### Import avoiding cache:

```js
const freshData = rooter.execute("/subpath", "to", "somefile.js");
```

##### Build routes from glob patterns:

```js
const routes = rooter.find(["/subpath", "/each/string/is/a/pattern"], "/all/the/args/are/flatten");
```

##### Import using cache from glob patterns:

```js
const dataSet = rooter.findAndRequire("/subpath/to/somefile.js");
```

##### Import avoiding cache from glob patterns:

```js
const freshDataSet = rooter.findAndExecute("/subpath/to/somefile.js");
```

## API Reference


 


----

### Rooter = require("rooter")

Class of `rooter`.




 


-----

### rooter = new Rooter($directory)

Constructor of `rooter` instances.

Defines the `rooter.ROOT` path from which the other routes will be built.




 


-----

### Rooter.create($directory)

The same as the constructor.




 


-----

### rooter.resolve(...$routes)

Method that builds a route from its parts and starting from the `rooter.ROOT` path.




 


-----

### rooter.find(...$patterns)

Method that returns the paths of the files found from the provided `glob` patterns and starting from the `rooter.ROOT` path.




 


-----

### rooter.require(...$route)

Method that imports one module (using the usual cache of `node`) from the parts of its path and from the `rooter.ROOT` path.




 


-----

### rooter.resolve(...$route)

Method that imports one module (avoiding the usual cache of `node`) from the parts of its path and from the `rooter.ROOT` path.




 


-----

### rooter.resolve(...$patterns)

Method that first finds all the files matching the `glob` patterns provided from the `rooter.ROOT` path, and then imports them (using the usual cache of `node`).




 


-----

### rooter.resolve(...$patterns)

Method that first finds all the files matching the `glob` patterns provided from the `rooter.ROOT` path, and then imports them (avoiding the usual cache of `node`).






## Test

`$ npm run test`

## Documentation

`$ npm run docs`

## Issues

[Here](https://github.com/allnulled/path-rooter/issues).

## License

[WTFPL](https://es.wikipedia.org/wiki/WTFPL). 100% free.
# Read this file
