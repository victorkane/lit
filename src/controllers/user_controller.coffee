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

# Access a user's account page:
app.get '/user/:id', (req, res) ->
  res.json [{}]
  
# Update a user's account:
app.put '/user/:id', (req, res) ->
  res.json [{}]
  
# Disable a user's account
app.post '/user/:id/:op', (req, res) ->
  res.json [{}]

# Enable a user's account
app.post '/user/:id/:op', (req, res) ->
  res.json [{}]

# Delete a user's account
app.delete '/user/:id', (req, res) ->
  res.json [{}]

# Get a list of users:
app.get '/user/users', (req, res) ->
  res.json [{}]

