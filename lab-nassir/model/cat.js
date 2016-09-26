'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('cat:cat');
const storage = require('../lib/storage');

const Cat = module.exports = function(name, breed){
  if(!name) throw createError(400, 'We expected a name for this cat...');
  if(!breed) throw createError(400, 'We expected a breed for this cat...');

  this.id = uuid.v1();
  this.name = name;
  this.breed = breed;
};

Cat.createCat = function(_cat) {
  debug('Hit createCat');
  try {
    let cat = new Cat(_cat.name, _cat.breed);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  }
};
