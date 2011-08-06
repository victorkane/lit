
/**
 * Module dependencies.
 */

var Text = require('../models/text');
var md = require('markdown-js').markdown;

function restrict(req, res, next) {
  console.log('visited restricted');
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

function accessLogger(req, res, next) {
  console.log('/restricted accessed by %s', req.session.user.registration_email);
  next();
}

module.exports = function(app){
  /**
   * Map :text to the database, loading
   * every time :text is present.
   */

  app.param('text', function(req, res, next, id){
    Text.get(id, function(err, text){
      if (err) return next(err);
      if (!text) return next(new Error('failed to load text ' + id));
      var doc = new Text(text.title, text.body, text.author);
      //doc._id = text._id;
      doc._id = id;
      doc._rev = text._rev;
      doc.createdAt = text.createdAt;
      doc.updatedAt = text.updatedAt;
      req.text = doc;
      next();
    });
  });

  /**
   * Add a text.
   */

  app.get('/text/add', restrict, accessLogger, function(req, res){
    res.render('text/form', { text: {}});
  });

  /**
   * Save a posted text.
   */

  app.post('/text', restrict, accessLogger, function(req, res){
    var data = req.body.text
      , text = new Text(data.title, data.body, req.session.user.registration_email);

    text.validate(function(err){
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }

      text.save(function(err){
        req.flash('info', 'Successfully created text _%s_', text.title);
        res.redirect('/textview/');
      });
    });
  });

  /**
   * Display the text.
   */

  app.get('/text/:text', restrict, accessLogger, function(req, res){
    res.render('text', { text: req.text, md: md });
  });

  /**
   * Display the text edit form.
   */

  app.get('/text/:text/edit', restrict, accessLogger, function(req, res){
    res.render('text/form', { text: req.text });
  });

  /**
   * Update text. Typically a data layer would handle this stuff.
   */

  app.put('/text/:text', restrict, accessLogger, function(req, res, next){
	var data = req.body.text;
    text = req.text;
    text.title = data.title;
    text.body = data.body;
    text.validate(function(err){
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      text.update(function(err){
        if (err) return next(err);
        req.flash('info', 'Successfully updated text');
        res.redirect('/textview');
      });
    });
  });
};
