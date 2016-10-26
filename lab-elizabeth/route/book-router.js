'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('book:book-router');
const createError = require('../lib/error-middleware');
const Book = require('../model/book');

const bookRouter = new Router();

bookRouter.delete('/api/book/:id', function(req, res, next){
  debug('running route DELETE /api/book');
  Book.deleteBook(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err));
});

bookRouter.get('/api/book/:id', function(req, res, next){
  debug('running route GET /api/book/:id');
  Book.fetchBook(req.params.id)
  .then(book => res.json(book))
  .catch(err => next(err));
});

bookRouter.get('/api/book', function(req, res, next){
  debug('running route GET /api/book');
  Book.fetchBooks()
  .then(docs => res.json(docs))
  .catch(next);
});

bookRouter.post('/api/book', jsonParser, function(req, res, next){
  debug('running route POST /api/book');
  Book.createBook(req.body)
  .then(book => res.json(book))
  .catch(err => next(err));
});

bookRouter.put('/api/book/:id', jsonParser, function(req, res, next){
  debug('running route PUT /api/book');
  console.log('id', req.params.id);
  console.log('body', req.body);
  if(!req.body.author || !req.body.title || !req.body.description) return Promise.reject(createError(400, 'bad request: no content'));
  if(!req.params.id) return Promise.reject(createError(400, 'bad request: no id'));

  Book.updateBook(req.body, req.params.id)
  .then(book => res.json(book))
  .catch(next);
});

module.exports = bookRouter;
