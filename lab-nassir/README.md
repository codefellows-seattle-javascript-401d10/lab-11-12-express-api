![cf](https://i.imgur.com/7v5ASc8.png) Javascript 401d10 -- Lab 11-12
======

## Express API -- CatAPI 2.0

CatAPI is proud to announce CatAPI 2.0! CatAPI 2.0 is not GUARANTEED to have fewer crippling bugs!

CatAPI is built using Express, and is tested using SuperAgent.

# What's new in 2.0

CatAPI 2.0 now accepts PUT methods! Also: Closing the server will now NOT erase all your data! This was our most requested feature, proving once again that customers come first at CatAPI.

# Install the API

From the home directory, run `npm i` in terminal. All required dependencies will install.

# Start the API

From the home directory, run `npm start` in terminal. A welcome message will be sent and the API is ready to use.

# Test the API

From the home directory, run `npm test` in terminal. A test using Mocha, Chai and Superagent will run. If any tests fail, see `What to do if you encounter a bug` below in this readme.

# API endpoints

CatAPI has one endpoint: `/api/cats/`

* `POST`: To create a cat record, pass in a JSON formatted object with two parameters -- name and breed. Your new cat record will be returned to you.

`{
    "breed": "Shorthair",
    "id": "513d0780-8072-11e6-a385-fbc82196f8d7",
    "name": "Moggy"
}
`
Make a mental note of this easy-to-remember ID number. It is the best way to retrieve, update and delete your cat's record. It is also the only way.

* `GET`: Enter your cat's ID number immediately after the endpoint:

`/api/cat/idnumber`

If a record with that ID exists, it will be returned to you within milliseconds.

* `DELETE`: Enter your cat's ID number immediately after the endpoint. A 204 status message will be returned to you if your record has been successfully deleted.

* `PUT`: Pass in a JSON object representing your changes along with your cat's ID number:

`echo '{"name": "NewCatName", "breed": "AnyBreed"}'| curl PUT localhost:3000/api/cat/1234`

IMPORTANT: Don't get the easy-to-remember ID number wrong when using PUT. Trust us on this...

CatAPI can only record the name and breed of your cats. Attempting to enter additional information will return an error message. CatAPI was the first cat-based API to break in this fashion, and our competitors are COPYCATS.

# Closing the API

From the shell instance running the server, end the server with `^C`.

# What to do if you encounter a bug

* If you are a Codefellows instructor, mark me down and leave me a note and I will fix it.
* If you are a Codefellows student, don't worry, I peek at your repos too. Message me on Slack if I'm not around.
* If you are not from Codefellows, put a dollar in a sock every day for a year. At the end of the year, you should have enough to buy a little violin.
