
/**
 * Module dependencies.
 */

var Text = require('../models/text');

function getCount (req, res, next) {
  Text.count(function(err, count){
	req.count = count;
	next();
  });
}
 
function getTexts (req, res, next) {
  Text.all(function(err, texts){
	req.texts = texts;
	next();
  });
}

module.exports = function(app){
  app.get('/', getCount, getTexts, function(req, res, next){
    res.render('index', {
      count: req.count
      , texts: req.texts
    });
  });
  
  app.get('/textview', getCount, getTexts, function(req, res, next){
    res.render('textview', {
      count: req.count
      , texts: req.texts
    });
  });
};