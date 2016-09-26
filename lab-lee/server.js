'use strict';

// npm modules
const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('note:server');
const jsonParser = require('body-parser').json();

// app modules
const Mutant = require('./model/mutant');
const storage = require('./lib/storage');

// module constants
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
