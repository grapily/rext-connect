var connect = require('../node_modules/connect/')
  , rext_connect = require('../lib/rext-connect')
  , app = connect()
  , port = 3000
  , prefix = "myapp"
  ;


var rext = {};
rext.list = function (options, callback) {
  callback(null, "myapp LIST "+JSON.stringify(options));
};

rext.create = function (options, callback) {
  callback(null, "myapp CREATE "+JSON.stringify(options));
};

rext.update = function (options, callback) {
  callback(null, "myapp UPDATE "+JSON.stringify(options));
};

rext.destroy = function (options, callback) {
  callback(null, "myapp DESTROY "+JSON.stringify(options));
};

rext.retrieve = function (options, callback) {
  callback(null, "myapp RETRIEVE "+JSON.stringify(options));
};

app.use(connect.bodyParser());
app.use(connect(connect.static(__dirname)));
app.use(connect.router(rext_connect.routes({"prefix":prefix,"rext":rext})));
app.use(connect.router(rext_connect.routes())).listen(port);

console.log('Server running at http://127.0.0.1:'+port+'/');




