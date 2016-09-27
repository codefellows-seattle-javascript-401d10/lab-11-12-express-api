'use strict';

//npm modules
const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('book:server');
//app modules
const Book = require('./model/book');
//module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/api/book', function(req, res, next){
  debug('running route GET /api/book');
  Book.createBook(req.query.id)
  .then(book => res.json(book))
  .catch(err => next(err));
});

app.post('/api/book', jsonParser, function(req, res, next){
  debug('running route POST /api/book');
  Book.fetchBook(req.body)
  .then(book => res.json(book))
  .catch(err => next(err));
});

app.put('/api/book', jsonParser, function(req, res, next){
  debug('running route PUT /api/book');
  Book.updateBook(req.body, req.query.id)
  .then(book => res.json(book))
  .catch(err => next(err));
});

app.use(function(err, req, res){
  debug('running error middleware');
  console.error(err.message);

  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, function(){
  debug(`server up on ${PORT}`);
});
