# This 'controller' will handle the server requests
# for the User entity

fields = forms.fields
validators = forms.validators
widgets = forms.widgets;

reg_form = forms.create
  firstname: fields.string
    required: false 
  lastname: fields.string
    required: false 
  email: fields.email
    required: true 
  password: fields.password
    required: true
  confirm: fields.password
    required: true
    validators: [validators.matchField('password')]

# Register:
app.get '/user/register', (req, res) ->
  res.render 'register'
    locals: form: reg_form.toHTML()

# Access login form:
app.get '/user/login', (req, res) ->
  res.json [{}]

# Submit login form:
app.post '/user/login', (req, res) ->
  res.json [{}]

# Logout:
app.get '/user/logout', (req, res) ->
  res.json [{}]

# Create a new user account
app.post '/user', (req, res) ->
  reg_form.handle req,
    success: (form) ->
      console.log form.data
    error: (form) ->
      console.log 'oops'
      aform = reg_form.bind(form.data)
      res.render 'register'
        locals: form: aform.toHTML()