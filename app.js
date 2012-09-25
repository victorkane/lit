(function() {
  var app, port;

  global.express = require('express');

  global.app = app = express();

  require("" + __dirname + "/src/configuration");

  require("" + __dirname + "/src/controllers/home_controller");

  app.listen(port = 3000);

  console.log("Lit server listening on port %d in %s mode", port, app.settings.env);

}).call(this);
