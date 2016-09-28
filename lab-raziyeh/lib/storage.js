'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'),{suffix:'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp-bluebird'),{suffix:'Prom'});
const del = require('del');
const createError = require('http-errors');
const debug = require('debug')('book:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));

  return mkdirp(`${__dirname}/../data/${schemaName}`)
  .catch( err => Promise.reject(createError(500, err.message)))
  .then(() => fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify(item)))
  .then(() => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.getItem = function(schemaName, id){
  debug('get item / storage.js');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));
  
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(createError(500, err.message));
      }
    })
    .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(createError(400,'expected schemaName'));
  if(!id) return Promise.reject(createError(400,'expected id'));

  return del(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( book => {
      book.join('\n');
    })
    .catch (err => Promise.reject(createError(404, err.message)));
};

exports.availIDs = function(schemaName) {
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then(filenames => filenames.map(name=> name.split('.json')[0]))
  .catch(err => Promise.reject(createError(404, err.message)));
};
