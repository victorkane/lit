
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

module.exports = function(app){
  app.get('/', getCount, function(req, res, next){
      Text.all(function(err, texts){
        res.render('index', {
            count: req.count
          , texts: texts
        });
      });
  });
};