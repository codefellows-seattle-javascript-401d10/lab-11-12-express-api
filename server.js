'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');

const Apple = require('./model/apple.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/hello', function(req, res, next){
  debug('hit route /api/apple');
  Apple.fetchApple(req.query.id)
  .then( apple => res.json(apple))
  .catch( err => next(err));
});

app.post('/api/apple', jsonParser, function(req, res, next){
  debug('hit route POST /api/apple');
  Apple.createNote(req.body)
  .then(apple => res.json(apple))
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
  res.status(500).send('ServerError');
});

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
