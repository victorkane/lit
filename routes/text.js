
/**
 * Module dependencies.
 */

var Text = require('../models/text');

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
  console.log('/restricted accessed by %s', req.session.user.name);
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
      //var doc = new Text(text.);
      console.log(text);
      req.text = text;
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
      , text = new Text(data.title, data.body);

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
    res.render('text', { text: req.text });
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
    var text = req.text;
    text.validate(function(err){
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      text.update(req.body.text, function(err){
        if (err) return next(err);
        req.flash('info', 'Successfully updated text');
        res.redirect('/textview');
      });
    });
  });
};