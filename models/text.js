
// Couchdb data store

var cradle = require('cradle');
var db = new(cradle.Connection)().database('lit_texts');

var Text = exports = module.exports = function Text(title, body, author) {
  this.title = title;
  this.body = body;
  this.author = author;
  this.createdAt = new Date;
};

Text.prototype.save = function(fn){
  db.save(this, function(error, result) {
    if(error) {
      fn(error)
    }else{
      fn()
    }
  });
};

Text.prototype.update = function(fn){
  this.updatedAt = new Date;
  this.save(fn);
};


Text.prototype.validate = function(fn){
  if (!this.title) return fn(new Error('_title_ required'));
  if (!this.body) return fn(new Error('_body_ required'));
  if (this.body.length < 10) {
    return fn(new Error(
        '_body_ should be at least **10** characters long, was only _' + this.title.length + '_'));
  }
  fn();
};

exports.get = function(id, fn){
  db.get(id, function(error, doc) {
    if (error) {
      fn(error)
    }else{
      fn(null, doc)
    }
  });
};

exports.byAuthor = function(author, fn) {
  db.view('default/byAuthor', {key: author}, function(error, result) {
    if(result.length > 0) {
      fn(null, result)
    }else{
      fn(error)
    }
  });
}
	
/*****	
  var arr = Object.keys(db).reduce(function(arr, id){
	    arr.push(db[id]);
	    return arr;
	  }, []);
	  fn(null, arr);
	};
*****/
	
/*****************
Text.prototype.destroy = function(fn){
  exports.destroy(this.id, fn);
};

exports.count = function(fn){
  fn(null, Object.keys(db).length);
};



exports.destroy = function(id, fn) {
  if (db[id]) {
    delete db[id];
    fn();
  } else {
    fn(new Error('text ' + id + ' does not exist'));
  }
};
*******************************************/