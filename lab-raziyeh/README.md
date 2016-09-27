# Express-API
=============
uses express to run POST, GET, PUT and DELETE requests.
structures :

- lib
    - storage.js
- model
    - book.js
- route
    - book-router.js
- test
    - person-route-test.js
- data
    - schemaName (example:person)
        - JSON files - created with POST request
- root
    - server.js
    - gulpfile.js
    - .gitignore
    - .eslintrc
    - README.md
    - package.json

## Getting Started
- In terminal enter : node server.js
- also you can run gulp
- for run tests in terminal enter:
    - gulp  OR
    - mocha


### Prerequisities

- dependencies:

```
npm install --save node-uuid superagent bluebird mkdirp-bluebird del morgan http-errors express debug body-parser

```

- devDependencies:

```
npm install -D gulp-eslint gulp-mocha mocha gulp chai

```

## Running
- In package.json add a new property named "start": "DEBUG='book*' node server.js", to Scripts object.
- In your root server, type in the command **"npm run start"** in your terminal.
- OR in terminal type: gulp


- GET request:
    ```http localhost:3000/api/book?id=selectedId ```

- POST request:
    ```echo '{"title":"yourname", "author":"female/male", "page":"100"}' | http POST localhost:3000/api/book ```

- PUT request:
    ```echo '{"id":"1111", "title":"yourname", "author":"female/male", "page":"100"}' | http PUT localhost:3000/api/book ```

- DELETE request:
    ```http DELETE localhost:3000/api/book?id=selectedId ```

## Testing:
- we have 6 tests for GET and POST requests :
    - test to ensure that  API returns a status code of 404 for routes that have not been registered
    - tests to ensure that **/api/person** endpoint responds as described for each condition below:
        - GET - test 404, responds with 'not found' for valid request made with an id that was not found
        - GET - test 400, responds with 'bad request' if no id was provided in the request
        - GET - test 200, response body like {<data>} for a request made with a valid id
        - POST - test 400, responds with 'bad request' for if no body provided or invalid body
        - POST - test 200, response body like {<data>} for a post request with a valid body
        - PUT

## Built With:
* Nodejs
* express
* JavaScript
* Visual studio code 3

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Raziyeh Bazargan** - [Github](https://github.com/RaziyehBazargan)

## License

This project is licensed under the ISC License.
