'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const storage = require('../lib/storage');
const debug = require('debug')('book:book');

const Book = module.exports = function(title, author, description){
  if(!title) throw createError(400, 'title expected');
  if(!author) throw createError(400, 'author expected');
  if(!description) throw createError(400, 'description expected');

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

Book.fetchIDs = function(){
  debug('fetchIDs');
  return storage.availIDs('book');
};

Book.updateBook = function(input, id){
  debug('updateBook');
  return storage.fetchItem('book', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(book => {
    for(var key in book){
      if(key === 'id') continue;
      if(input[key]) book[key] = input[key];
    }
    return storage.createItem('book', book);
  });
};
