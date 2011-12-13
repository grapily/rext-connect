/*!
 * NAME
 * Copyright (c) 2011 Grapily <dev@grapily.com>
 * MIT Licensed
 */

var rext_connect = module.exports = {};

/**
 * Library version
 */
rext_connect.version = '0.0.2';


/**
 * Send back an error message to the client.
 * @param {Response} res http.ServerResponse Object
 * @param {String} message Text to send
 */
function sendError(res, message) {
  res.writeHead(400, {
    'Content-Length': message.length,
    'Content-Type': 'text/plain'
  })
  res.end(message);
}

/**
 * Initialize the module.
 *
 * @param {Object} options
 * @param {String} [options.prefix="rext"] routes prefix
 * @param {Rext} options.rext
 * @api public
 */

rext_connect.routes = function (options) {
  if ( !options || !options.rext ) {
    throw new Error('Rext object required');
  }
  
  var options = options
    , prefix = options.prefix || 'rext'
    , version = 1
    , pre = '/' + prefix + '/' + version
    , rext = options.rext || {}
    , paths = { 
          destroy: pre + '/resources/:document/:version/destroy'
        , list: pre + '/resources/:document?'
        , retrieve: pre + '/resources/:document/:version'
        , create: pre + '/resources/:document/:version/create'
        , update: pre + '/resources/:document/:version/update'
      }
    ;

  return function (app) {

    app.get(paths.list, function (req, res, next) {
      var name = req.params.document;
      
      rext.list(name, function (err, reply) {
        if (err) {
          sendError(res, err.message);
          return;
        }
        var data = JSON.stringify(reply);
        res.writeHead(200, {
          'Content-Length': data.length,
          'Content-Type': 'application/json'
        });
        
        res.end(data);
      });
    });

    app.get(paths.retrieve, function (req, res, next) {
      var options = {
        name: req.params.document,
        version: req.params.version
      };

      rext.retrieve(options, function (err, reply) {
        if (err) {
          res.end(err.message);
          return;
        };

        res.writeHead(200, {
            'Content-Length': reply.length,
            'Content-Type': 'text/plain'
        });
        
        //put the line below in the server
        //callback(null, fs.createReadStream(filePath));
        //reply.pipe(res);
        res.end(reply.toString('utf8'));
      });
    });
    
    
    app.get(paths.destroy, function (req, res, next) {
      var options = {
        name: req.params.document,
        version: req.params.version
      };

      rext.destroy(options, function (err, reply) {
        if (err) {
          sendError(res, err.message);
          return;
        }
        
        res.end();
      });
    });

    app.post(paths.create, function (req, res, next) {
      var options = {
        name: req.params.document,
        version: req.params.version,
        data: req.body.data
      };

      rext.create(options, function (err, reply) {
        if (err) {
          sendError(res, err.message);
          return;
        }

        res.end();
      });
    });

    app.post(paths.update, function (req, res, next) {
      
      var options = {
        name: req.params.document,
        version: req.params.version,
        data: req.body.data
      };
      
      rext.update(options, function (err, reply) {
        if (err) {
          sendError(res, err.message);
          return;
        }

        res.end();
      });
    });
  };
};