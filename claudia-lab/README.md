##About

##How to install
npm install package.json to get dependencies and dev dependencies

##How to start the server
run node server.js

##Route Documentation
Fruit = simple resource

##server.js
- Router and middleware required in and bound to instances of the app object.
- Server is set up and connected to the router

##fruit.js
- Creates a fruit object that store references to an id, name, texture and color, which make up the simple resource.
- Methods to create, fetch, update and delete are called on the object to call the storage module

##storage.js
- Defines the methods called on the fruit object in fruit.js.
- Each use promises to handle errors asynchronously.

##fruit-router.js
- get, post put and delete methods are called on instances of the `fruitRouter`, an object created from the Router module included in Express.
- Each method takes two parameters, a pathname, and a function that connect a pathname to an action and return a promise. If there are no errors, the promise will resolve and hold the value of a response to be sent back to the server. If there is an error, it will be caught and handled.
- the methods post and put (for creating and updating resources) include the middleware `jsonParser`, to convert the data as it is being passed through the function to respond to the server.
