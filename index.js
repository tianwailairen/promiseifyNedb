/* eslint-disable */

var NedbDatastore = require('nedb')
var assert = require('assert')

function fromInstance (nedbInstance) {
  var newDB = {
    nedb: nedbInstance
  }

  var methods = [ 'loadDatabase', 'insert', 'find', 'findOne', 'count', 'update', 'remove', 'ensureIndex', 'removeIndex']
  for (var i = 0; i < methods.length; i++) {
    var m = methods[i]
    newDB[m] = thenify(nedbInstance[m].bind(nedbInstance))
  }

  return newDB
}

function thenify ($$__fn__$$) {
  assert(typeof $$__fn__$$ === 'function')
  return eval(createWrapper($$__fn__$$.name))
}

function createCallback (resolve, reject) {
  return function (err, value) {
    if (err) return reject(err)

    return resolve(value)
  }
}

function createWrapper (name) {
  return `(function ${name} (){
		var self = this
		var len = arguments.length
		var args = new Array(len + 1)
		var lastIndex = 0;
		for(var i = 0; i < len; i++) { 
			args[i] = arguments[i]
		}
		lastIndex = i
		return new Promise(function(resolve, reject) {
			args[lastIndex] = createCallback(resolve, reject)
			$$__fn__$$.apply(self, args)
		})
	})`
}

function datastore (options) {
  var nedbInstance = new NedbDatastore(options)
  return fromInstance(nedbInstance)
}

// so that import { datastore } still works:
datastore.datastore = datastore
datastore.fromInstance = fromInstance

module.exports = datastore
