### Bookstagram!

this is an API made to help people keep track of books.

#### Use

First, of course, you want to have NodeJS installed. You can download it [here.](https://nodejs.org/en/)

then, you want to open up the directory (in the terminal) which contains the package.json and type:
```
npm install
```
this will install all dependencies needed to run the server and access the API.

Then, you just type:
```
node run server.js
```
to start the server on port 3000.

#### Routes

GET book by ID : `/api/book/:bookID`
  - Expected input `null`
  - expected output
      ```json
      {
        "id": "<id>",
        "title": "<title>",
        "author": "<author>",
        "description": "<description>"
      }
      ```

POST book : `/api/book/`
  - Expected input
  ```json
  {
    "title": "<title>",
    "author": "<author>",
    "description": "<description>"
    }
  ```
  - expected output
      ```json
      {
        "id": "<id>",
        "title": "<title>",
        "author": "<author>",
        "description": "<description>"
      }
      ```

PUT book by ID : `/api/book/:bookID`
  - Expected input
    ```json
    {
      "title": "<title>",
      "author": "<author>",
      "description": "<description>"
    }
    ```
  - expected output
    ```json
    {
      "id": "<id>",
      "title": "<new title>",
      "author": "<new author>",
      "description": "<new description>"
    }
    ```

DELETE book by ID : `/api/book/:bookID`
  - Expected input `null`
  - expected output `null`
