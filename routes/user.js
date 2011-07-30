/**
 * Module dependencies.
 */

var Text = require('../models/text');

var User = require('../models/user').User;
var user = new User();

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

  app.get('/logout', function(req, res) {
	// destroy the user's session to log them out
	// will be re-created next request
	req.session.destroy(function() {
		res.redirect('home');
	});
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post('/login', function(req, res) {
	user.login(req.body.username, req.body.password, function(err, user) {
		if (user) {
			// Regenerate session when signing in
			// to prevent fixation 
			req.session.regenerate(function() {
				// Store the user's primary key 
				// in the session store to be retrieved,
				// or in this case the entire user object
				req.session.user = user[0].value;
				//res.redirect('back');
                req.flash('info', 'Welcome _%s_ _%s_', req.session.user.first_name, req.session.user.last_name);
				res.redirect('/textview');
			});
		} else {
			req.flash('error', 'Authentication failed, please check your username and password. (Use "tj" and "foobar" but it will not work hehe )');
			res.redirect('back');
		}
	});
  });
  
  app.get('/register', function(req, res) {
    res.render('registration');
  });

  app.get('/textview', getCount, getTexts, restrict, accessLogger, function(req, res, next){
    res.render('textview', {
      count: req.count
      , texts: req.texts
    });
  });
};