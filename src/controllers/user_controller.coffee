# This 'controller' will handle the server requests
# for the User entity

fields = forms.fields
validators = forms.validators
widgets = forms.widgets;

reg_form = forms.create
  email: fields.email(required: true)
  

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
  console.log form

