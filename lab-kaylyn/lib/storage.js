'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const del = require('del');
const debug = require('debug')('portfolio:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp-bluebird'));

module.exports = exports = {};

exports.createPortfolio = function(schemaName, item){
  if (!schemaName) return Promise.reject(createError(400,'expected schemaName'));
  if (!item) return Promise.reject(createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return mkdirp(`${__dirname}/../data/${schemaName}`)
  .then (fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json))
  .then( () => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchPortfolio = function(schemaName, id){
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected id'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch(err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deletePortfolio = function(schemaName, id) {
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected id'));
  return del(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(portfolio => {
    portfolio.join('\n');
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};
