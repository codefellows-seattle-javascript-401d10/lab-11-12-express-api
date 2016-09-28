'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('duck:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const mkdirp = Promise.promisifyAll(require('mkdirp'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');

  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!item) return Promise.reject(createError(400, 'expected an item'));

  let json = JSON.stringify(item);
  return fs.accessProm(`${__dirname}/../data/${schemaName}`)
  .catch(err => {
    if(err.code === 'ENOENT') {
      return mkdirp.mkdirpProm(`${__dirname}/../data/${schemaName}`);
    }
    return Promise.reject(err);
  })
  .then( () =>
  fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
)
  .then( () => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.putItem = function(schemaName, item) {
  debug('putItem');

  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!item) return Promise.reject(createError(400, 'expected an item'));

  let json = JSON.stringify(item);
  return fs.accessProm(`${__dirname}/../data/${schemaName}`)
  .catch(err => {
    if(err.code === 'ENOENT') {
      return mkdirp.mkdirpProm(`${__dirname}/../data/${schemaName}`);
    }
    return Promise.reject(err);
  })
  .then(() =>
  fs.appendFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
)
  .then(() => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch(err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(createError(400, 'expected a schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.fetchAll = function(schemaName) {
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( filenames => filenames.map(name => name.split('.json')[0]))
  .catch(err => Promise.reject(createError(404, err.message)));
};
