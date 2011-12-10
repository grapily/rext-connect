/*!
 * NAME
 * Copyright (c) 2011 Grapily <dev@grapily.com>
 * MIT Licensed
 */

var rext_connect = module.exports = {};

/**
 * Library version
 */
rext_connect.version = '0.0.1';

function echo(options, callback) {
  callback(null, JSON.stringify(options));
};

/**
 * Initialize the module.
 *
 * @param {Object} options
 * @param {String} [options.prefix="rext"] set the prefix of routes
 * @param {Object} [options.rext] set the functions attached to routes
 * @param {function} [options.rext.list]
 * @param {function} [options.rext.create]
 * @param {function} [options.rext.destroy]
 * @param {function} [options.rext.retrieve]
 * @param {function} [options.rext.update]
 * @api public
 */

rext_connect.routes = function (options) {
  var options = options || {}
    , prefix = options.prefix || 'rext'
    , version = 1
    , pre = '/' + prefix + '/' + version
    , rext = options.rext || {}
    , list = rext.list || echo
    , create = rext.create || echo
    , destroy = rext.destroy || echo
    , retrieve = rext.retrieve || echo
    , update = rext.update || echo
    ; 

  return function (app) {

    /**
     * Define "list" route.
     * Call the list function and pass a options object to it
     * @params {Object} req
     * @params {Object} req.params
     * @params {String} [req.params.module] the module name
     */
    app.get(pre + '/resources/:module?', 
      function (req, res, next) {
        var options = {};

        options['name']= req.params.module;

        list(options, function (err, reply) {
          if (err) res.end(err);

          res.writeHead(200, {
            'Content-Length': reply.length,
            'Content-Type': 'text/plain' }
          );

          res.end(reply);
        })
      }
    );

    /**
     * Define "retrieve" route.
     *
     */
    app.get(pre + '/resources/:module/:version',
      function (req, res, next) {
        var options = {};

        options['name'] = req.params.module;
        options['version'] = req.params.version;

        retrieve(options, function (err, reply) {
          if (err) res.send(err);

          res.writeHead(200, {
              'Content-Length': reply.length,
              'Content-Type': 'text/plain' }
          );

          res.end(reply);
        });
      }
    );

    /**
     * Define "destroy" route.
     *
     */
    app.get(pre + '/resources/:module/:version/destroy',
      function (req, res, next) {
        var options = {};

        options['name'] = req.params.module;
        options['version'] = req.params.version;

        destroy(options, function (err, reply) {
          if (err) res.send(err);

          res.writeHead(200, {
            'Content-Length': reply.length,
            'Content-Type': 'text/plain' }
          );

          res.end(reply);
        });
      }
    );

    /**
     * Define "create" route.
     *
     */
    app.post(pre + '/resources/:module/:version/create',
      function (req, res, next) {
        var options = {};

        options['name'] = req.params.module;
        options['version'] = req.params.version;
        options['data'] = req.body.data;

        create(options, function (err, reply) {
          if (err) res.send(err);

          res.writeHead(200, {
            'Content-Length': reply.length,
            'Content-Type': 'text/plain' 
            }
          );

          res.end(reply);

        });
      }
    );

    /**
     * Define "update" route.
     *
     */
    app.post(pre + '/resources/:module/:version/update',
      function (req, res, next) {
        var options = {};

        options['name'] = req.params.module;
        options['version'] = req.params.version;
        options['data'] = req.body.data;

        update(options, function (err, reply) {
          if (err) res.send(err);

          res.writeHead(200, {
            'Content-Length': reply.length,
            'Content-Type': 'text/plain' }
          );

          res.end(reply);
        });
      }
    );

  }
}


