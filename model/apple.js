'use strict';

const createError = require('http-errors');
const debug = require('debug')('note:server');
const uuid = require('node-uuid');
const storage = require('../lib/storage.js');


const Apple = module.exports = function(type, color, size){
  debug('instantiate apple');
  if (!type) throw createError(400, 'expected type');
  if (!color) throw createError(400, 'exptected color');
  if (!size) throw createError(400, 'exptected size');

  this.id = uuid.v1();
  this.type = type;
  this.color = color;
  this.size = size;
};

Apple.createApple = function(apple) {
  debug('createApple');
  try{
    let apple = new Apple(apple.color, apple.color);
    return storage.createItem('apple', apple);
  } catch (err) {
    return Promise.reject(err);
  }
};

Apple.fetchNote = function(id){
  debug('fetchNote');
  return storage.fetchItem('note', id);
};
