'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Book = require('../model/book.js');
const debug = require('debug')('book:server');

const app = express();

module.exports = function() {
  app.post('/api/book', jsonParser, function(req, res, next){
    debug('hit route POST / api/note');
    Book.createBook(req.body)
   .then(book => res.json(book))
   .catch(err => next(err));
  });
};