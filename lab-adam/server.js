'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug');

const noteRouter = require('./route/vehicle-router.js');
const errorMiddleware = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(noteRouter);

app.use(errorMiddleware);

app.listen(PORT, function(){
  debug(`server up on ${PORT}`);
});
