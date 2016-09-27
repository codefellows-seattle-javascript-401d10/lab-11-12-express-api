##About

##How to install
1. npm install package.json to get dependencies and dev dependencies

##How to start the server
1. run node server.js

##Route Documentation
`server.js` - uses express to add methods to app to POST, GET, PUT and DELETE
each methods map a method to an endpoint and calls method on the FruitsList object
Promises are also c

`fruitslist.js` - creates a FruitsList object that store references to an id, title, fruit and date, which make up the simple resources. Methods to create, fetch, update and delete are called on the object to call the storage module

`storage.js` - defines the methods called on the FruitsList object in  fruitslist.js. Each use promises to handle errors asynchronously.
