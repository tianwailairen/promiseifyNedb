/* eslint-disable */

var NedbDatastore = require('nedb')
var thenify = require('./thenify')

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

function datastore (options) {
  var nedbInstance = new NedbDatastore(options)
  return fromInstance(nedbInstance)
}

// so that import { datastore } still works:
datastore.datastore = datastore
datastore.fromInstance = fromInstance

module.exports = datastore
