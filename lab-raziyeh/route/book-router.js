'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('book:book-router');

const Book = require('../model/book.js');

const bookRouter = new Router();

bookRouter.post('/api/book', jsonParser, function(req, res, next){
  debug('hit route POST / api/book');
  Book.createItem(req.body)
     .then(book => res.json(book))
     .catch(err => next(err));
});

bookRouter.get('/api/book/:id', function(req, res, next){
  debug('hit route GET / api/book:id');
  Book.getItem(req.params.id)
  .then( book => res.json(book))
  .catch (err => next(err));
});

bookRouter.get('/api/book/', function(req, res, next){
  debug('hit route GET / api/book');
  Book.getIDs()
  .then( ids => res.json(ids))
  .catch ( err => next(err));
});

bookRouter.delete('/api/book/:id', function(req, res, next) {
  debug('hit route DELETE /api/book');
  Book.deleteItem('book', req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(err));
});

bookRouter.put('/api/book/:id',jsonParser, function(req,res, next) {
  debug('hit route PUT /api/book');
  Book.updateItem(req.params.id, req.body)
  .then(book => res.json(book))
  .catch(err => next(err));
});

module.exports = bookRouter;