Lab 11 Express api

This is a project for Code 401 Day 11 using a simple resource API with express.

This project takes data in the form of {name: <name>, age: <age.}

Please install HTTP Pie for most effective use.

Type "npm run start" in your terminal.

In another terminal tab, use these commands:

POST new data:

echo '{"name": "<name>", "age": "<age>"}' | http:localhost:3000/api/person

GET data:
http GET localhost:3000/api/person id ==<id# here>

UPDATE data:
Completely forgot how to do this in the terminal, will get back to it later

DELETE data:
http DELETE localhost:3000/api/person id==<id# here>
