'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('book:book-router');
const Book = require('../model/book');

const bookRouter = new Router();

bookRouter.delete('/api/book', function(req, res, next){
  debug('running route DELETE /api/book');
  Book.deleteBook(req.query.id)
  .then(book => res.json(book))
  .catch(err => next(err));
});

bookRouter.get('/api/book', function(req, res, next){
  debug('running route GET /api/book');
  Book.createBook(req.query.id)
  .then(book => res.json(book))
  .catch(err => next(err));
});

bookRouter.post('/api/book', jsonParser, function(req, res, next){
  debug('running route POST /api/book');
  Book.fetchBook(req.body)
  .then(book => res.json(book))
  .catch(err => next(err));
});

bookRouter.put('/api/book', jsonParser, function(req, res, next){
  debug('running route PUT /api/book');

  Book.updateBook(req.body, req.query.id)
  .then(book => res.json(book))
  .catch(next);
});

module.exports = bookRouter;
