![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Lab 11-12
======

## Express API -- CatAPI 2.0

CatAPI is proud to announce CatAPI 2.0! CatAPI 2.0 is not GUARANTEED to have way fewer crippling bugs!

CatAPI is built using Express, and is tested using SuperAgent.

# What's new in 2.0

CatAPI 2.0 now accepts PUT methods! If you have a cat and for some reason want to change its name, you may now do so. If your cat has changed its breed, CatAPI 2.0 now also permits CHANGING BREEDS. CatAPI 2.0 is the FIRST and ONLY cat-based API to have this feature! CatAPI supports equality.

Also new in 2.0: Closing the server will now NOT erase all your data! This was our most requested feature, proving once again that customers come first at CatAPI.

# Start the API

From your terminal, navigate to the home directory and enter `npm start`. A welcome message will greet you and the API is ready to use.

# Use the API

CatAPI has one endpoint: `/api/cats`. It accepts four HTTP methods: GET, POST, PUT and DELETE.

GET and DELETE receive a querystring with an ID. For example:

`localhost:3000/api/cat?id=1234`

POST accepts a JSON object with `name` and `breed` parameters. When you POST a new cat, the server will return a JSON object reflecting your new cat record:

`{
    "breed": "Shorthair",
    "id": "513d0780-8072-11e6-a385-fbc82196f8d7",
    "name": "Moggy"
}
`

Make a mental note of this easy-to-remember ID number. It is the best way to retrieve, update and delete your cat's record. It is also the only way.

To update your cat record, use PUT. Pass in a JSON object representing your changes along with your cat's ID number:

`echo '{"name": "NewCatName", "breed": "AnyBreed"}'| curl PUT localhost:3000/api/cat?id=1234`

IMPORTANT: Don't get the easy-to-remember ID number wrong when using PUT. Trust us on this...

CatAPI can only record the name and breed of your cats. Attempting to enter additional information will return an error message. CatAPI was the first cat-based API to break in this fashion, and our competitors are COPYCATS.

# Breaking the API

CatAPI 2.0's error messages are among the clearest in the cat API industry. The possible status codes and error messages are:

* `200`: Something is working!
* `204`: You successfully deleted your content.
* `404` and the message `Id not found!`: You've entered the wrong ID.
* `404` and the message `Not found!`: You're not using the `/api/cat` endpoint.
* `400` and the message `Bad request!`: You haven't entered an ID.
* `400` and the message `Bad request!`: You are attempting to POST improperly formatted JSON objects.
* `400` and the message `Bad request!`: You are attempting to POST without including a JSON object.

# Closing the API

From the shell instance running the server, end the server with `^C`.

# What to do if you encounter a bug

* If you are a Codefellows instructor, mark me down and leave me a note and I will fix it.
* If you are a Codefellows student, don't worry, I peek at your repos too.
* If you are not from Codefellows, put a dollar in a sock every day for a year. At the end of the year, you should have enough to buy a little violin. Go ahead and play it.
