## About The Program:
This program is a simple REST API that keeps track of and regulates portfolios. The specifications on what a valid portfolio entry should include is represented in the model with mandatory properties like a unique id, about, projects, and work. The user can write to and receive information from previously existing journal entries as well as write new ones and delete or update old ones. To achieve this functionality a user can implement the following http methods: GET, POST, PUT, or DELETE. The program makes use of npm's Express module to parse a given request URL which can then be routed and handled appropriately depending on what method was being passed in as part of the URL as an endpoint.

##User Guide:
It is important to structure your files as follows:
* **lib dir** will contain your middleware and storage files
* **model dir** will contain your object constructor, which will be a simple resource, as well as the http methods on that constructor
* **test dir** will contain your program test files

*See package.json for required dependencies*

To run the program:

Run the server file
```
npm run start
```

To create a GET request:
```
http localhost:3000/api/portfolio/<id>
```

To create a new POST request:
```
echo '{"headline": "headline text goes here", "article": "article text goes here"}' | http POST localhost:3000/api/portfolio
```
This should return a valid JSON object with all of the pre-determined key:value pairs

**Note that /portfolio is the endpoint for this specific use case**

To delete a portfolio entry, require the id of the entry you wish to delete and pass that to the URL with the DELETE method specified in the request:
```
http DELETE localhost:3000/api/portfolio/<portfolio entry id>
```
