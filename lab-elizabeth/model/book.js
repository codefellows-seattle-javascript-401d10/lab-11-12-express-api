'use strict';

const uuid = require('node-uuid');
// const createError = require('http-errors');
const storage = require('../lib/storage');
const debug = require('debug')('book:book');

const Book = module.exports = function(title, author, description){
  if(!title) throw new Error('title expected');
  if(!author) throw new Error('author expected');
  if(!description) throw new Error('description expected');
  this.id = uuid.v1();
  this.title = title;
  this.author = author;
  this.description = description;
};

Book.createBook = function(input){
  debug('createBook');
  try {
    let book = new Book(input.title, input.author, input.description);
    return storage.createItem('book', book);
  } catch(err) {
    return Promise.reject(err);
  }
};

Book.deleteBook = function(id){
  debug('deleteBook');
  return storage.deleteItem('book', id);
};

Book.fetchBook = function(id){
  debug('fetchBook');
  return storage.fetchItem('book', id);
};

Book.updateBook = function(input, id){
  debug('updateBook');
  return storage.updateItem('book', input, id);
};
