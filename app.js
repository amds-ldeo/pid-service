var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors  = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bibcodeRouter = require('./routes/bibcode');
var doiRouter = require('./routes/doi');
var dataciteDOIRouter = require('./routes/dataciteDOI');



var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/ads', bibcodeRouter);

app.use('/crossref', doiRouter);

app.use('/datacite', dataciteDOIRouter);

module.exports = app;
