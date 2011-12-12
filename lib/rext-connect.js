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
          destroy: pre + '/resources/:module/:version/destroy'
        , list: pre + '/resources/:module?'
        , retrieve: pre + '/resources/:module/:version'
        , create: pre + '/resources/:module/:version/create'
        , update: pre + '/resources/:module/:version/update'
      }
    ;

  return function (app) {

    app.get(paths.list, function (req, res, next) {
      var options = {
        name: req.params.module
      };

      rext.list(options, function (err, reply) {
        if (err) {
          res.send(err);
          return;
        }

        res.writeHead(200, {
          'Content-Length': reply.length,
          'Content-Type': 'text/plain'
        });

        res.end(reply);
      });
    });

    app.get(paths.retrieve, function (req, res, next) {
      var options = {
        name: req.params.module,
        version: req.params.version
      };

      rext.retrieve(options, function (err, reply) {
        if (err) {
          res.send(err);
          return;
        };

        res.writeHead(200, {
            'Content-Length': reply.length,
            'Content-Type': 'text/plain'
        });

        res.end(reply);
      });
    });
    
    
    app.get(paths.destroy, function (req, res, next) {
      var options = {
        name: req.params.module,
        version: req.params.version
      };

      rext.destroy(options, function (err, reply) {
        if (err) {
          res.send(err);
          return;
        }

        res.writeHead(200, {
          'Content-Length': reply.length,
          'Content-Type': 'text/plain' 
        });

        res.end(reply);
      });
    });

    app.post(paths.create, function (req, res, next) {
      var options = {
        name: req.params.module,
        version: req.params.version,
        data: req.body.data
      };

      rext.create(options, function (err, reply) {
        if (err) {
          res.send(err);
          return;
        }

        res.writeHead(200, {
          'Content-Length': reply.length,
          'Content-Type': 'text/plain' 
        });

        res.end(reply);
      });
    });

    app.post(paths.update, function (req, res, next) {
      var options = {
        name: req.params.module,
        version: req.params.version,
        data: req.body.data
      };
      
      rext.update(options, function (err, reply) {
        if (err) {
          res.send(err);
          return;
        }

        res.writeHead(200, {
          'Content-Length': reply.length,
          'Content-Type': 'text/plain' 
        });

        res.end(reply);
      });
    });
  };
};