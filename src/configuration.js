(function() {

  app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: require('crypto').createHash('md5').update(Math.random() + 'v').digest('hex')
    }));
    app.use(app.router);
    app.use(express["static"](__dirname + '../public'));
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.set('views', "" + __dirname + "/views");
    app.set('view engine', 'ejs');
    return app.use(require('connect-assets')());
  });

}).call(this);
