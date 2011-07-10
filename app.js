
/**
 * Module dependencies.
 */

var express = require('express')
  , site = require('./site')
  , crypto = require('crypto');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('staging', function(){
  app.use(express.errorHandler()); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

//General

app.get('/', site.index);

// Start
app.listen(3000);
console.log("lit listening on port %d", app.address().port);
