# Express-API -
=============
using Express, Router-level middleware for GET, POST, PUT, DELETE requests.
using parameters instead of string query.

This app allows clients to connect to the API and perform the following operations on the /api/book path:

 - GET: takes an ID (e.g. /api/book/:id)
 - POST: takes a body JSON object with the properties : title, author, page
 - PUT: takes an ID and body JSON; modifies an existing object with the provided JSON.
 - DELETE: takes an ID and delete the object corresponding to the ID.

structures :
- lib
    - storage.js
    - error-middleware.js
- model
    - book.js
- route
    - book-router.js
- test
    - book-test.js
- data
    - schemaName (example:book)
        - JSON files - created with POST request
- root
    - server.js
    - gulpfile.js
    - .gitignore
    - .eslintrc
    - README.md

## Getting Started
- In terminal enter : you can in package.json file set the property "start": "DEBUG='book*' node server.js" and in Terminal just type : **npm run start"
- npm run start
- also you can run gulp
- for run tests in terminal enter:
    - gulp  OR
    - mocha


### Prerequisities

- dependencies:

```
npm install -S node-uuid superagent bluebird mkdirp-bluebird del body-parser debug express http-errors morgan

```

- devDependencies:

```
npm install -D gulp-eslint gulp-mocha mocha gulp chai

```

## Running

- In your root server, type in the command **"node server.js"** in your terminal.
- OR in terminal type: gulp


- GET request:
    ```http localhost:3000/api/book/selectedId ```

- POST request:
    ```echo '{"title":"book title", "author":"test", "page":"444"}' | http POST localhost:3000/api/book ```

- PUT request:
    ```echo '{"title":"book title", "author":"test", "page":"444"}' | http PUT localhost:3000/api/book/selectedId ```

- DELETE request:
    ```http DELETE localhost:3000/api/book/selectedId ```

## Testing:
- you can in package.json file set the property "test": "DEBUG='book*' ./node_modules/mocha/bin/mocha" and in Terminal just type : **npm test**

- we have 6 tests for GET and POST requests :
    - test to ensure that  API returns a status code of 404 for routes that have not been registered
    GET - request no longer have 400 test
    PUT and POST - test 400 for bad json
    DELETE - test 404, for a DELETE request with an invalid or missing id 404 for missing id because DELETE /api/book/ is not a route
    DELETE - test 204, with an empty response body for DELETE request with a valid id

## Built With:
* Node.js
* express.js
* JavaScript
* Visual studio code 3

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Raziyeh Bazargan** - [Github](https://github.com/RaziyehBazargan)

## License

This project is licensed under the ISC License.
