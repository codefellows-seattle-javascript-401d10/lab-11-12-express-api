'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('person:person');
const storage = require('../lib/storage.js');

const Person = module.exports = function(name, age){
  debug('instantiate person');
  if (!name) throw createError(400, 'expected name');
  if (!age) throw createError(400, 'expected content');

  this.id = uuid.v1();
  this.name = name;
  this.age = age;
};

Person.createPerson = function (_person){
  debug('createPerson');
  try {
    let person = new Person(_person.name, _person.age);
    return storage.createItem('person', person);
  } catch (err){
    return Promise.reject(err);
  }
};

Person.fetchPerson = function(id){
  debug('fetchPerson');
  return storage.fetchItem('person', id);
};

Person.deletePerson = function(id){
  debug ('deletePerson');
  return storage.deleteItem('person', id);
};

Person.updatePerson = function(id, person) {
  debug('updatePerson');
  if (!id) return Promise.reject(createError(400, 'bad request'));
  if (!person) return Promise.reject(createError(400, 'bad request'));
  return storage.fetchItem('person', id)
  .then( (database_person)=> {
    for (var key in database_person){
      if (key === 'id') continue;
      if (person[key]) database_person[key] = person[key];
    }
    return storage.createItem ('person', database_person);
  })
  .catch( (err) =>  Promise.reject(createError(500, err.message)));
};
