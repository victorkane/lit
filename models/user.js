var cradle = require('cradle');
var crypto = require('crypto');

//Used to generate a hash of the plain-text password + salt
function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

User = function(host, port) {
  this.connection= new (cradle.Connection)(host, port, {
    cache: true,
    raw: false
  });
  this.db = this.connection.database('lit-users');
};

User.prototype.login = function(login_name, login_password, callback) {
    this.db.view('default/login', {key: login_name}, function(error, result) {
      if( error ){
        callback(error)
      }else{
    	// TODO try first without md5 or salt, ascii in database only until we get GUI user registration going
    	if (result[0].value.password == login_password) {
          callback(null, result);
    	}else{
    	  callback('auth error');
    	}
      } 
    });
};

User.prototype.register = function(data, callback) {
  console.log(data);
  callback('reg error');
};

exports.User = User;