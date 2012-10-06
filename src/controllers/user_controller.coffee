# This 'controller' will handle the server requests
# for the User entity

# Register:
app.get '/user/register', (req, res) ->
  res.json [{}]

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
  res.json [{}]

