include a readme with a project description
  * how to install
  * how to start the serever
  * document the routes

## Project description

Creates a RESTful single-resource API with a persistent storage layer. Uses CRUD operations to create, update, and destroy 'Dogs'.

### How to install

See package.json for list of dependencies necessary to install and run this project.

### How to start the server

From the root level of the project, enter 'npm script' in terminal to start the server.

### Server endpoints

POST requests

/api/dog

* Pass a new 'dog' as valid JSON into the body of the request to create a dog

GET requests

/api/dog/:id

* Pass a dog id to fetch a specific dog

PUT requests

/api/dog/:id

* Pass a dog id and a valid JSON body to update the dog with that id

DELETE requests

/api/dog/:id

* Pass a dog id to delete that dog
