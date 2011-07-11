
/**
 * Module dependencies.
 */

var Text = require('../models/text');

module.exports = function(app){
  app.get('/', function(req, res){
    Text.count(function(err, count){
      Text.all(function(err, texts){
        res.render('index', {
            count: count
          , texts: texts
        });
      });
    });
  });
};