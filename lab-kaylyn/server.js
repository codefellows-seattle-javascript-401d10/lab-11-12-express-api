'use strict';

const morgan = require('morgan');
const express = require('express');
// const createError = require('http-errors');
const debug = require('debug')('portfolio:server');
// const Portfolio = require('./model/portfolio.js');
const errorMiddleware = require('./lib/error-middleware.js');
const portfolioRouter = require('./route/portfolio-route.js');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(portfolioRouter);

app.use(errorMiddleware);

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
