/**
 * Module dependencies.
 */

var crypto = require('crypto');
var Text = require('../models/text');

var users = {
  tj: {
    name: 'tj'
    , salt: 'randomly-generated-salt'
    , pass: md5('foobar' + 'randomly-generated-salt')
  }
};

//Used to generate a hash of the plain-text password + salt
function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

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

function authenticate(name, pass, fn) {
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying
  // the md5 against the pass / salt, if there is a match we
  // found the user
  if (user.pass == md5(pass + user.salt)) return fn(null, user);
  // Otherwise password is invalid
  fn(new Error('invalid password'));
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
	authenticate(req.body.username, req.body.password, function(err, user) {
		console.log(user);
		if (user) {
			// Regenerate session when signing in
			// to prevent fixation 
			req.session.regenerate(function() {
				// Store the user's primary key 
				// in the session store to be retrieved,
				// or in this case the entire user object
				req.session.user = user;
				//res.redirect('back');
                req.flash('info', 'Welcome _%s_', req.session.user.name);
				res.redirect('/textview');
			});
		} else {
			req.flash('error', 'Authentication failed, please check your username and password. (Use "th" and "foobar")');
			res.redirect('back');
		}
	});
  });
  
  app.get('/textview', getCount, getTexts, restrict, accessLogger, function(req, res, next){
    res.render('textview', {
      count: req.count
      , texts: req.texts
    });
  });
};