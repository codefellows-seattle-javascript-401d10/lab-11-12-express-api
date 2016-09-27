'use strict';

const createError = require('http-errors');
const debug = require('debug')('pizza:pizza');
const uuid = require('node-uuid');
const storage = require('../lib/storage');

const Pizza = module.exports = function(sauce, crust, meat, cheese){
  debug('instantiate pizza');
  if(!sauce) throw createError(400, 'expected sauce');
  if(!crust) throw createError(400, 'expected crust');
  if(!meat) throw createError(400, 'expected meat');
  if(!cheese) throw createError(400, 'expected cheese');

  this.id = uuid.v1();
  this.sauce = sauce;
  this.crust = crust;
  this.meat = meat;
  this.cheese = cheese;
};

Pizza.createPizza = function(pizza){
  debug('createPizza');
  try {
    let newPizza = new Pizza(pizza.sauce, pizza.crust, pizza.meat, pizza.cheese);
    return storage.createItem('pizza', newPizza);
  } catch (err) {
    return Promise.reject(err);
  }
};

Pizza.updatePizza = function(id, _pizza){
  debug('updatePizza');
  return storage.fetchItem('pizza', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( pizza => {
    for (var key in pizza){
      if (key === 'id') continue;
      if (_pizza[key]) pizza[key] = _pizza[key];
    }
    return storage.createItem('pizza', pizza);
  });
};

Pizza.fetchPizza = function(id){
  debug('fetchPizza');
  return storage.fetchItem('pizza', id);
};

Pizza.deletePizza = function(id){
  debug('deletePizza');
  return storage.deleteItem('pizza', id);
};
