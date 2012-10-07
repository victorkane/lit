(function() {
  var fields, reg_form, validators, widgets;

  fields = forms.fields;

  validators = forms.validators;

  widgets = forms.widgets;

  reg_form = forms.create({
    email: fields.email({
      required: true
    })
  });

  app.get('/user/register', function(req, res) {
    return res.render('register', {
      locals: {
        form: reg_form.toHTML()
      }
    });
  });

  app.get('/user/login', function(req, res) {
    return res.json([{}]);
  });

  app.post('/user/login', function(req, res) {
    return res.json([{}]);
  });

  app.get('/user/logout', function(req, res) {
    return res.json([{}]);
  });

  app.post('/user', function(req, res) {
    return res.json;
  });

}).call(this);
