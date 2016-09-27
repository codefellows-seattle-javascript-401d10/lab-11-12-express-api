'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('cat:server');
// const createError = require('http-errors');
const catRouter = require('./route/cat-routes');
const errorMiddleware = require('./lib/error-middleware');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(catRouter);
app.use(errorMiddleware);

app.listen(PORT, function() {
  debug('Server is up and listening on PORT' + PORT);
  console.log('Server is up and listening on PORT' + PORT);
});
