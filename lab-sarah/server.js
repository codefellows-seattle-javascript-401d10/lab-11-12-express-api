'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
// const Router = express.Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');

// app modules
const Dog = require('./model/dog');
// const storage = require('./lib/storage.js');

// module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.post('/api/dog', jsonParser, function(req, res, next){
  debug('hit route /api/dog');
  Dog.createDog(req.body)
  .then(dog => res.json(dog))
  .catch(err => next(err));
});

app.get('/api/dog', function(req, res, next){
  debug('hit route GET /api/note');
  Dog.fetchDog(req.query.id)
  .then( dog => res.json(dog))
  .catch( err => next(err));
});

app.put('/api/dog', jsonParser, function(req, res, next){
  debug('hit route /api/dog');
  console.log('req.id in server.js', req.body.id);
  // if (req.body.id)
  Dog.updateDog(req.body)
  .then(dog => res.json(dog))
  .catch(err => next(err));
});

app.delete('api/dog', function(req, res, next) {
  debug('hit route /api/dog');
  Dog.deleteDog(req.id)
  .catch(err => next(err));
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
});
