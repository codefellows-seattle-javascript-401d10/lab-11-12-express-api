# Project Overview

The purpose of this project is to create a RESTful API with persistent storage for creating, reading, updating and deleting ducks.

## Duck properties
  * Ducks have the following properties:
    * `Name` Every duck has a name.
    * `Color` Ducks are all a color, and not always yellow.
    * `Feathers` Refers to the # of feathers, represented as a string.
    * `Id` Every duck is given a random id number that also corresponds to its filename in the persistent database.

## How to Install the Project

Check out the [package.json] (https://github.com/broxsonl/lab-06-tcp-chat/blob/master/lab-lee/package.json) file for the project to see the specific Dependencies required to run this project or develop for it.

## How to Start the Server

To start the server, go to the root directory of the project and run the following command:

        $ node server.js

That should start the server. If you're unsure, you should receive a console log to your CLI that lets you know the server has started running at either a port you specified or the default port 3000.

## This Duck API's Routes

The following GET and DELETE paths are valid routes that may be queried with requests. Keep in mind, [PORT] represents where the port number should be passed in.:

        * `$ localhost:[PORT]/api/duck/[Id]` Returns a duck if an existing duck Id is entered in place of [Id].

The following POST and PUT paths currently require testing through your CLI with the server up and running in another instance. You can PUT and POST new ducks from JSON files by running the following commands, where [filepath] is the filepath to the json file being used:

        *  `$ cat [filepath] | http post localhost:[PORT]/api/duck` Creates a new duck from the json object specified in filepath.
        * `$ cat [filepath] | http put localhost:[PORT]/api/duck` Creates a new duck from the json object at the specified filepath if one with the same id property and filename doesn't exist. If one already exists, the information will instead be appended.


## How to Test this Project

This project's paths were created with test-driven development. With the dependencies properly installed according to the above package.json file, you can run the following command in the project's root directory to test all viable routes for the project's api:

        $ gulp

That's it! The default actions for the 'gulp' command is to both check its scripts against the project's linter and to run all of the tests in the test folder.
