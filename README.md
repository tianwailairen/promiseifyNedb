promiseifyNedb
==============

A promise wrapper for [NeDB](https://github.com/louischatriot/nedb).

Installation
============

Install with NPM:

`$ npm i --save promiseifyNedb`

Usage
=====

Example using ES7 async/await:
```javascript
import datastore from 'promiseifyNedb'

async function doDatabaseStuff() {
  let DB = datastore({
     // these options are passed through to nedb.Datastore

     filename: 'my-db.json',

     autoload: true // so that we don't have to call loadDatabase()
  })

  await DB.insert([{
    num: 1, alpha: 'a'
  }, {
    num: 2, alpha: 'b'
  }])

  let document = await DB.findOne({ num: 1 })

  // use NeDB cursors:
  let documents = await DB.cfind({})
    .projection({ num: 1, _id: 0 })
    .exec()
}

doDatabaseStuff()
```

API
===

## datastore(options)

Returns an object that proxies to an internal `nedb.Datastore` instance (`options` are passed through to the NeDB constructor), with promisified methods.


## datastore.fromInstance(nedbInstance)

Use this method if you already have a NeDB instance that you want to wrap with the promisified methods.
