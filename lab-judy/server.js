'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('note:server');

// app modules
const personRouter = require('./route/person-router.js');

//module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

//register routes
app.use(personRouter);




app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
