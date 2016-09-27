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
