'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
//const Router = express.Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');
// app modules

// app modules
const Book = require('./model/book.js');
//const storage = require('./lib/storage.js');

//module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/book', jsonParser, function(req, res, next){
  debug('hit route POST / api/note');
  Book.createBook(req.body)
   .then(note => res.json(note))
   .catch(err => next(err));
});


app.use(function(err, req, res) {
  console.error(err.message);
  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
 // res.status(err.status).send(err.name);
});

// in terminal --> DEBUG ='note*' node server.js
app.listen(PORT, function() {
  debug(`server up ${PORT}`);
});
