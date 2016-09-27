'use strict';

const morgan = require('morgan');
const express = require('express');

const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('book:server');

const Book = require('../model/book.js');

const app = express();

module.exports = function(){
  app.use(morgan('dev'));

  app.post('/api/book', jsonParser, function(req, res, next){
    debug('hit route POST / api/book');
    Book.createBook(req.body)
     .then(book => res.json(book))
     .catch(err => next(err));
  });

  app.get('/api/book', function(req, res, next){
    debug('hit route GET / api/book');
    console.log('id ',req.query.id);
    Book.getBook('book', req.query.id)
      .then( book => res.json(book))
      .catch (err => next(err));
  });

  app.delete('/api/book', function(req, res, next) {
    debug('hit route DELETE /api/book');
    Book.deleteBook('book', req.query.id);
    next();
  });

  app.put('/api/book', function(req,res, next) {
    debug('hit route PUT /api/book');
    Book.updateBook('book', req.query.id);
    next();
  });

  app.use(function(err, req, res, next) {
    console.error(err.message);
    if(err.status) {
      res.status(err.status).send(err.name);
      next();
      return;
    }

    err = createError(500, err.message);
    res.status(err.status).send(err.name);
    next();
  });
};
