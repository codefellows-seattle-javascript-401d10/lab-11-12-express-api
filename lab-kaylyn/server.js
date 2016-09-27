'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('portfolio:server');
const Portfolio = require('./model/portfolio.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/portfolio', jsonParser, function(req, res, next){
  debug('hit route /api/portfolio');
  Portfolio.createPortfolio(req.body)
  .then(portfolio => res.json(portfolio))
  .catch(err => next(err));
});

app.get('/api/portfolio', function(req, res, next){
  debug('hit route GET /api/portfolio');
  Portfolio.fetchPortfolio('portfolio', req.query.id)
  .then( portfolio => res.json(portfolio))
  .catch( err => next(err));
  next();
});

app.delete('/api/portfolio', function(req, res, next){
  debug('hit route DELETE /api/portfolio');
  Portfolio.deletePortfolio('portfolio', req.query.id)
  .then( () => debug('portfolio deleted'))
  .catch( err => next(err));
  next();
});

app.put('/api/portfolio', jsonParser, function(req, res, next){
  debug('hit route PUT /api/porfolio');
  Portfolio.updatePortfolio(req.query.id, req.body)
  .then( portfolio => res.json(portfolio))
  .catch(err => next(err))
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);
  if (err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
