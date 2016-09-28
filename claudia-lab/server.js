'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('fruit:server');

// app modules
const fruitRouter = require('./router/fruit-router.js');
const errorMiddleware = require('./lib/error-middleware.js');

//module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

//register routes
app.use(fruitRouter);
app.use(errorMiddleware);


app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
