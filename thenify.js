
/**
 * Turn async functions into promises
 *
 * @param {Function} $$__fn__$$
 * @return {Function}
 * @api public
 */

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

module.exports = thenify