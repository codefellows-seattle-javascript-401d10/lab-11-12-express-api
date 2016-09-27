'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const Router = express.Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');

// app modules
const Person = require('./model/person');
const storage = require('./lib/storage.js');

//module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/hello', function(req, res){
  debug ('hit route /api/hello');
  res.json({msg: 'hello'});
});

app.post('/api/person', jsonParser, function(req, res, next){
  debug('hit route /api/person');
  Person.createPerson(req.body)
  .then (person => res.json(person))
  .catch (err => next(err));
});

app.get('/api/person', function(req, res, next){
  debug ('hit route GET /api/person');
  Person.fetchPerson(req.query.id)
  .then (person => res.json(person))
  .catch( err => next(err));
});

//delete data
app.delete('/api/person', function(req, res, next){
  debug ('hit route DELETE /api/person');
  Person.deletePerson(req.query.id)
  .then (() => res.status(204).send())
  .catch ( err => next (err));
});


//TODO: need PUT method
app.put('/api/person', jsonParser, function(req, res, next){
  debug ('hit route PUT /api/person');
  Person.updatePerson(req.query.id, req.body)
  .then ((person) => res.json(person))
  .catch ( err => next (err));
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
});

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
