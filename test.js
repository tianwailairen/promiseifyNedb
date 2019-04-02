var datastore = require('./index')

const DB = datastore({ autoload: true })

var a = DB.insert([{
    o: 1
}, {
    o: 2
}])

a.then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
});
console.log(a);