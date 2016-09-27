![cf](https://i.imgur.com/7v5ASc8.png) lab 12 express continued
======

# To Submit this Assignment
  * continue using your fork of lab 11
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas
  * write how long you spent on canvas

# Directions
* refactor your app to use a router for your single resource
* refactor your routes so that requests use parameters instead of query strings
* refactor your app so the error-handling middleware is its own module

# Test 
 * `DELETE` - test 404, for a DELETE request with an invalid or missing id
  * 404 for missing id because `DELETE /api/<simple-resource-name>/` is not a route
 * `DELETE` - test 204, with an empty response body for DELETE request with a valid id
