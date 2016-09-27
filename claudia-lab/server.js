'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
//const Router = express.Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('fruitslist:server');

// app modules
const FruitsList = require('./model/fruitslist.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

//request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

//posts to fruitslist
app.post('/api/fruitslist', jsonParser, function(req, res, next){
  debug('hit route POST /api/fruitslist');
  FruitsList.createFruitsList(req.body)
  .then(fruitslist => res.json(fruitslist))
  .catch(err => next(err));
});

//gets a fruitslist from the server
app.get('/api/fruitslist', function(req, res, next){
  debug('hit route GET /api/fruitslist');
  FruitsList.fetchFruitsList(req.query.id)
  .then( fruitslist => res.json(fruitslist))
  .catch( err => next(err));
});

//updates a fruitslist with a specific id
app.put('/api/fruitslist', jsonParser, function (req, res, next) {
  debug('hit route PUT /api/fruitslist');
  FruitsList.updateFruitsList(req.query.id, req.body)
  .then(fruitslist => res.json(fruitslist))
  .catch( err => next(err));
});

//updates a fruitslist with a specific id
app.delete('/api/fruitslist', function (req, res, next) {
  debug('hit route DELETE /api/fruitslist');
  FruitsList.deleteFruitsList(req.query.id)
  .then(fruitslist => res.json(fruitslist))
  .catch( err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
  console.log('server running');
});
