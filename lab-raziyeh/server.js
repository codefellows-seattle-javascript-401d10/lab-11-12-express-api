'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('book:server');

const bookRouter = require('./route/book-router.js');
const errorMiddleware = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(errorMiddleware);
app.use(bookRouter);

app.listen(PORT, function() {
  debug(`server up on Port:: ${PORT}`);
});
