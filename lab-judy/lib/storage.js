'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('note:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const del = require('del');

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('createItem');
  console.log(item, ' line 13 of storage createdItem');
  //error handling
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!item) return Promise.reject(createError(400, 'expected item'));
  //return Promise.resolve(item)
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then(() => {
    return Promise.resolve(item);
  })
  .catch( err => {
    Promise.reject(createError(500, err.message));
  });
};

exports.fetchItem = function(schemaName, id){
  debug('fetchItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
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
  debug('deleteItem');
    //error handling
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject (createError(400, 'expected id'));

  return del([`${__dirname}/../data/${schemaName}/${id}.json`])
  .then ( paths => {
    try{
      console.log('file deleted at: \n', paths);
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch (err => Promise.reject(createError(404, err.message)));
};
