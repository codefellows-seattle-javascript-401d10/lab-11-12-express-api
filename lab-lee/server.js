'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('duck:server');


// app modules
const errorMiddleware = require('./lib/error-middleware.js');
const duckRouter = require('./route/duck-router.js');
const cors = require('./lib/cors-middleware.js');
// const storage = require('./lib/storage');

// module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);

// register routers
app.use(duckRouter);
app.use(errorMiddleware);

app.listen(PORT, function(){
  debug(`server up at PORT: ${PORT}`);
});
