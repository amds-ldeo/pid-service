var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors  = require('cors');

const swaggerUi = require('swagger-ui-express'),
      swaggerJSDoc = require("swagger-jsdoc");

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var bibcodeRouter = require('./routes/bibcode');
var crossrefDOIRouter = require('./routes/crossrefDOI');
var dataciteDOIRouter = require('./routes/dataciteDOI');



var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/ads', bibcodeRouter);

app.use('/crossref', crossrefDOIRouter);

app.use('/datacite', dataciteDOIRouter);


var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Astro-PID (Node/Express)',
      description: 'Information about PID service.'
    },
    //host: 'localhost:3000',
    basePath: '/'
  }
  
  // options for the swagger docs
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js']
  }
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options)
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  
  // serve swagger
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

module.exports = app;
