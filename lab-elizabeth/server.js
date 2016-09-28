'use strict';

//npm modules
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('book:server');
//app modules
const bookRouter = require('./route/book-router');
const errorMiddleware = require('./lib/error-middleware');
//module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

//register routes
app.use(bookRouter);
app.use(errorMiddleware);

app.listen(PORT, function(){
  debug(`server up on ${PORT}`);
});
