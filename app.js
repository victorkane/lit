
/**
 * Module dependencies.
 */

var express = require('express')
  , messages = require('express-messages');

var app = module.exports = express.createServer();

// Config

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.dynamicHelpers({
    messages: messages
  , base: function(){
    // return the app's mount-point
    // so that urls can adjust. For example
    // if you run this example /text/add works
    // however if you run the mounting example
    // it adjusts to /blog/text/add
    return '/' == app.route ? '' : app.route;
  }
});

// Middleware

app.configure(function(){
  app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes

require('./routes/site')(app);
require('./routes/text')(app);
require('./routes/user')(app);

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
