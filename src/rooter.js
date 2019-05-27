const path = require("path");
const importFresh = require("import-fresh");
const globby = require("globby");
const flatten = require("array-flatten");

/**
 * 
 * # path-rooter
 * 
 * Set of utilities that combine glob patterns and node (fresh) imports from a root path.
 * 
 * ## Explanation
 * 
 * This tool can do 6 things via 6 methods:
 * 
 *    - `rooter.resolve`: Build paths from a root path and the parts.
 *    - `rooter.require`: Import files from a root path and the parts.
 *    - `rooter.execute`: Execute files from a root path and the parts.
 *    - `rooter.find`: Find files from a root path and a set of `glob` patterns.
 *    - `rooter.findAndRequire`: Import files from a root path and a set of `glob` patterns.
 *    - `rooter.findAndExecute`: Execute files from a root path and a set of `glob` patterns.
 * 
 * ## Installation
 * 
 * `$ npm i -s path-rooter`
 * 
 * ## Usage
 * 
 * ##### Import the module and create an instance:
 * 
 * ```js
 * const Rooter = require("path-rooter");
 * const rooter = Rooter.create(__dirname+"/..");
 * ```
 * 
 * ##### Build 1 route:
 * 
 * ```js
 * const route = rooter.resolve("/subpath/to/somewhere", "and/using", "parts.js");
 * ```
 * 
 * ##### Import using cache:
 * 
 * ```js
 * const data = rooter.require("/subpath", "to", "somefile.js");
 * ```
 * 
 * ##### Import avoiding cache:
 * 
 * ```js
 * const freshData = rooter.execute("/subpath", "to", "somefile.js");
 * ```
 * 
 * ##### Build routes from glob patterns:
 * 
 * ```js
 * const routes = rooter.find(["/subpath", "/each/string/is/a/pattern"], "/all/the/args/are/flatten");
 * ```
 * 
 * ##### Import using cache from glob patterns:
 * 
 * ```js
 * const dataSet = rooter.findAndRequire("/subpath/to/somefile.js");
 * ```
 * 
 * ##### Import avoiding cache from glob patterns:
 * 
 * ```js
 * const freshDataSet = rooter.findAndExecute("/subpath/to/somefile.js");
 * ```
 * 
 * ## API Reference
 * 
 */


/**
 * 
 * #### Rooter = require("rooter")
 * 
 * Class of `rooter`.
 * 
 */
class Rooter {

	/**
	 * 
	 * -----
	 * 
	 * #### rooter = new Rooter($directory)
	 * 
	 * Constructor of `rooter` instances.
	 * 
	 * Defines the `rooter.ROOT` path from which the other routes will be built.
	 * 
	 * Accepts a string.
	 * 
	 */
	constructor(basedir) {
		this.ROOT = path.resolve(basedir);
	}

	/**
	 * 
	 * -----
	 * 
	 * #### Rooter.create($directory)
	 * 
	 * The same as the constructor.
	 * 
	 */
	static create(...args) {
		return new Rooter(...args);
	}

	/**
	 * 
	 * -----
	 * 
	 * #### rooter.resolve(...$routes)
	 * 
	 * Method that builds a route from its parts and starting from the `rooter.ROOT` path.
	 * 
	 * It accepts a list of strings that will be merged and appended to `rooter.ROOT`.
	 * 
	 * Returns a string with the resultant file.
	 * 
	 */
	resolve(route, ...routes) {
		return path.resolve(this.ROOT, ...[route.replace(/^\//g, ""), ...routes || []]);
	}

	/**
	 * 
	 * -----
	 * 
	 * #### rooter.find(...$patterns)
	 * 
	 * Method that returns the paths of the files found from the provided `glob` patterns and starting from the `rooter.ROOT` path.
	 * 
	 * It accepts a list of strings and arrays. Each string will be used as globby pattern and appended to `rooter.ROOT` to make the search.
	 * 
	 * Returns a list of strings with the files found.
	 * 
	 */
	find(...patterns) {
		return globby.sync(flatten(patterns).map(pattern => this.resolve(pattern)));
	}

	/**
	 * 
	 * -----
	 * 
	 * #### rooter.require(...$route)
	 * 
	 * Method that imports one module (using the usual cache of `node`) from the parts of its path and from the `rooter.ROOT` path.
	 * 
	 * It accepts a list of strings. Each string will be merged and appended to `rooter.ROOT` to create the new path, and that path is imported.
	 * 
	 * Returns the module.
	 * 
	 */
	require(...route) {
		return require(this.resolve(...route));
	}

	/**
	 * 
	 * -----
	 * 
	 * #### rooter.execute(...$route)
	 * 
	 * Method that imports one module (avoiding the usual cache of `node`) from the parts of its path and from the `rooter.ROOT` path.
	 * 
	 * It works the same as `require`, but it will avoid nodejs default caching.
	 * 
	 */
	execute(...route) {
		return importFresh(this.resolve(...route));
	}

	/**
	 * 
	 * -----
	 * 
	 * #### rooter.findAndRequire(...$patterns)
	 * 
	 * Method that first finds all the files matching the `glob` patterns provided from the `rooter.ROOT` path, and then imports them (using the usual cache of `node`).
	 * 
	 * It works the same as `find` and `require` combined. So, it returns a list (with what modules returned).
	 * 
	 */
	findAndRequire(...patterns) {
		return this.find(...patterns).map(pattern => require(pattern));
	}

	/**
	 * 
	 * -----
	 * 
	 * #### rooter.findAndExecute(...$patterns)
	 * 
	 * Method that first finds all the files matching the `glob` patterns provided from the `rooter.ROOT` path, and then imports them (avoiding the usual cache of `node`).
	 * 
	 * It works the same as `find` and `execute` combined. So, it returns a list (with what modules returned).
	 * 
	 */
	findAndExecute(...patterns) {
		return this.find(...patterns).map(pattern => importFresh(pattern));
	}

};

module.exports = Rooter;

/**
 * 
 *  ## Test
 * 
 * `$ npm run test`
 * 
 * ## Documentation
 * 
 * `$ npm run docs`
 * 
 * ## Issues
 * 
 * [Here](https://github.com/allnulled/path-rooter/issues).
 * 
 * ## License
 * 
 * [WTFPL](https://es.wikipedia.org/wiki/WTFPL). 100% free.
 * 
 */