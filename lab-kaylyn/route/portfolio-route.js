'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
// const portfolioRouter = new Portfolio();
const debug = require('debug')('portfolio:portfolioRouter');
// const Portfolio = require('../model/portfolio.js');


module.exports = portfolioRouter();

portfolioRouter.post('/api/portfolio', jsonParser, function(req, res, next){
  debug('hit route /api/portfolio');
  Portfolio.createPortfolio(req.body)
  .then(portfolio => res.json(portfolio))
  .catch(err => next(err));
});

//now using params
portfolioRouter.get('/api/portfolio/:id', function(req, res, next){
  debug('hit route GET /api/portfolio');
  Portfolio.fetchPortfolio(req.params.id)
  .then( portfolio => res.json(portfolio))
  .catch( err => next(err));
  next();
});

portfolioRouter.delete('/api/portfolio', function(req, res, next){
  debug('hit route DELETE /api/portfolio');
  Portfolio.deletePortfolio('portfolio', req.query.id)
  .then( () => debug('portfolio deleted'))
  .catch( err => next(err));
  next();
});

portfolioRouter.put('/api/portfolio', jsonParser, function(req, res, next){
  debug('hit route PUT /api/porfolio');
  Portfolio.updatePortfolio(req.query.id, req.body)
  .then( portfolio => res.json(portfolio))
  .catch(err => next(err))
});
