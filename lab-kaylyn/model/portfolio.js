'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('portfolio:portfolio');
const storage = require('../lib/storage.js');

const Portfolio = module.exports = function(about, projects, work) {
  debug('instantiate portfolio');
  if(!about) throw createError(400, 'expected about');
  if(!projects) throw createError(400, 'expected projects');
  if(!work) throw createError(400, 'expected work');
  this.id = uuid.v1();
  this.about = about;
  this.projects = projects;
  this.work = work;
};

Portfolio.createPortfolio = function(_portfolio) {
  debug('createPortfolio');
  try {
    let portfolio = new Portfolio(_portfolio.about, _portfolio.projects, _portfolio.work);
    return storage.createPortfolio('portfolio', portfolio);
  } catch (err) {
    return Promise.reject(err);
  }
};

Portfolio.fetchPortfolio = function(id){
  debug('fetchPortfolio');
  return storage.fetchPortfolio('portfolio', id);
};

Portfolio.updatePortfolio = function(id, _portfolio){
  debug('updatePortfolio');
  return storage.fetchPortfolio('portfolio', id)
  .catch(err => Promise.reject(createError(404, 'portfolio not found')))
  .then(portfolio => {
    for (var key in portfolio) {
      if(key === 'id') continue; //don't try and replace id
      if(_portfolio[key]) portfolio[key] = _portfolio[key];
    }
    return storage.createPortfolio('portfolio', portfolio);
  });
};

Portfolio.deletePortfolio = function(id){
  debug('deletePortfolio');
  return storage.deletePortfolio('portfolio', id);
};
