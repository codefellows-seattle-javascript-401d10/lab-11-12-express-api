<h1>A REST API for performing CRUD operations on Vehicles</h1>

This app allows clients to connect to the API and perform the following operations on the /api/vehicles path:
- GET: takes an ID (e.g. /api/vehicles/:id)
- POST: takes a body JSON object with the properties listed below
- PUT: takes an ID and body JSON; modifies an existing object with the provided JSON.
- DELETE: takes an ID and deletes the object corresponding to the ID.

Object Properties:
- "type" (e.g. 'sedan, hatchback'). Expect STRING
- "brand" (e.g. 'honda, toyota'). Expect STRING
- "rimSize" (e.g. 10, 13). Expect INTEGER
- "topSpeed" (e.g. 60). Expect INTEGER
