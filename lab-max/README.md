#Express API

This is a simple API compatible with all CRUD operations, written using Express.

To start, run:

  ```
  npm i
  ```

This will install all dependencies for this project, including:
- bluebird
- body-parser
- debug
- express
- http-errors
- mkdirp
- morgan
- node-uuid
- chai
- gulp
- gulp-eslint
- gulp-mocha
- mocha
- superagent

Once all dependencies are installed you can run

```
npm run start
```

which will start our server.

#GET

- A valid GET request should look like this, and result in a 200 status code:

```
http localhost:3000/api/pizza?id=(some id in our database)
```

and that will return the object, specified by id, with properties: sauce, crust, meat, and cheese.

- A GET request resulting in a 404 status error will return if a pizza at a specified id isn't found.

```
http localhost:3000/api/pizza?id=99999
```

- A GET request resulting in a 400 status error will return if there was a bad request. Meaning no id query was passed.

```
http localhost:3000/api/pizza
```

#POST

- A valid POST request should look like this, and result in a 200 status code:

```
echo '{"sauce": "red", "crust": "thin", "meat": "pepperoni", "cheese": "mozzarella"}' | http localhost:3000/api/pizza
```

- A POST request resulting in a 400 status error will return if there was a bad request. Meaning invalid body or no body was sent.

```
echo '{"sauce": "", "notCrust": "thin", "meat": "pepperoni", "cheese": "mozzarella"}' | http localhost:3000/api/pizza
```

#PUT

- A valid PUT request should look like this, and result in a 200 status code:

```
echo '{"sauce": "white", "crust": "thin", "meat": "bacon", "cheese": "cheddar"}' | http PUT localhost:3000/api/pizza?id=(some id in database)
```

- A PUT request resulting in a 400 status error will return if there was a bad request. Meaning invalid or no body was sent.

```
echo '{"sauce": "red", "crust": "thin", "notMeat": "pepperoni", "cheese": ""}' | http PUT localhost:3000/api/pizza?id=(some id in database)
```

- If a PUT request is made without passing in a id query, a new object will be made:

```
echo '{"sauce": "red", "crust": "thin", "meat": "pepperoni", "cheese": "mozzarella"}' | http PUT localhost:3000/api/pizza
```

#DELETE

- A valid DELETE request should look like this, and result in a 204 status code:

```
http DELETE localhost:3000/api/pizza?id=(some id in database)
```

- A DELETE request resulting in a 400 status error will return if there was a bad request. Meaning no id query was passed.

```
http DELETE localhost:3000/api/pizza
```
