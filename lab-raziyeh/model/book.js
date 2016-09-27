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

Book.createItem = function(data) {
  debug('create Item');
  try {
    let book = new Book(data.title, data.author, data.page);
    return storage.createItem('book', book);
  } catch (err) {
    return Promise.reject(err);
  }
};

Book.getItem = function(id) {
  debug('get Item');
  return storage.getItem('book', id);
};

Book.deleteItem = function(id) {
  debug('delete Item');
  return storage.deleteItem('book', id);
};

Book.updateItem = function(id, _book) {
  debug('getBook- updateItem');
  return storage.getItem('book', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(book => {
    for(var key in book) {
      if(key === 'id') continue;
      if(_book[key]) book[key] = _book[key];
    }
    return storage.createItem(book);
  });
};

Book.getIDs = function() {
  debug('getIDs');
  return storage.availIDs('book');
};
