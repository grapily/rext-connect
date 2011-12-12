var connect = require('../node_modules/connect/')
  , rext_connect = require('../lib/rext-connect')
  , app = connect()
  , port = 3000
  , prefix = "myapp"
  ;

function echo(options, callback) {
  callback(null, JSON.stringify(options));
};

function rext_function(name) {
  return function (options, callback) {
    callback(null, prefix + name + " " + JSON.stringify(options));
  }
}

var rext = {
  list: rext_function("LIST"),
  create: rext_function("CREATE"),
  update: rext_function("UPDATE"),
  destroy: rext_function("DESTROY"),
  retrieve: rext_function("RETRIEVE"),
};

var echo = {
  list: echo,
  create: echo,
  update: echo,
  destroy: echo,
  retrieve: echo
};

app.use(connect.bodyParser());
app.use(connect(connect.static(__dirname)));
app.use(connect.router(rext_connect.routes({"prefix": prefix,"rext": rext})));
app.use(connect.router(rext_connect.routes({"rext":echo}))).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');




