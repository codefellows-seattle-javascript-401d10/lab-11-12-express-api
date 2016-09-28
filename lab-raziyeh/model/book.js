'use strict';
const uuid = require('node-uuid');
const createError = require('http-errors');
const storage = require('../lib/storage.js');
const debug = require('debug')('book:server');

const Book = module.exports = function(title, author, page) {
  if(!title) throw(createError(400, 'expected Book title'));
  if(!author) throw(createError(400, 'expected Book author'));
  if(!page) throw(createError(400, 'expected Book pages'));

  this.id = uuid.v1();
  this.title = title;
  this.author = author;
  this.page = page;
  this.creationDate = new Date();
};

Book.createBook = function(data) {
  debug('create Book');
  try {
    let book = new Book(data.title, data.author, data.page);
    return storage.createItem('book', book);
  } catch (error) {
    return Promise.reject(error);
  }
};

Book.getBook = function(schemaName, id) {
  debug('get Book');
  return storage.getItem('book', id);
};

Book.deleteBook = function(schemaName, id) {
  debug('delete Book');
  return storage.deleteItem('book', id);
};

Book.updateBook = function(schemaName, id) {
  debug('update Book');
  return storage.updateItem('book', id);
};