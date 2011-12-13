var connect = require('../node_modules/connect/')
  , rext_connect = require('../lib/rext-connect')
  , Rext = require('../node_modules/rext')
  , app = connect()
  , port = 3000
  , prefix = "echo"
  ;

var rext = new Rext("./test/repo/");

app.use(connect.bodyParser());
app.use(connect(connect.static(__dirname)));
app.use(connect.router(rext_connect.routes({"rext":rext}))).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');




