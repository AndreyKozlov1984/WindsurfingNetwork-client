const express = require('express');
const debug = require('debug')('app:server');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser')
const validate = require('./validator');

const app = express();

// Apply gzip compression
app.use(compress());
app.use(bodyParser.json({limit: '50mb'}))

// proxy everything
app.use('/api', proxy('localhost:3001', {
    forwardPath: function(req, res) {
        return '/api' + require('url').parse(req.url).path;
    }
}));

// experimental flow validator:
// input: path to the file, line number, value
// goal: extract expected type from that line, then add a validator and report
// if there is a cetrain issue.
app.use('/validate', async function(req, res) {
    const result = await validate(req.body.file, req.body.line, req.body.jsonValue);
    res.json(result);
});

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig);

  debug('Enabling webpack dev and HMR middleware');
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: project.paths.client(),
      hot: true,
      quiet: project.compiler_quiet,
      noInfo: project.compiler_quiet,
      lazy: false,
      stats: project.compiler_stats
    })
  );
  app.use(
    require('webpack-hot-middleware')(compiler, {
      path: '/__webpack_hmr'
    })
  );

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()));

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
      'only serve the compiled application bundle in ~/dist. Generally you ' +
      'do not need an application server for this and can instead use a web ' +
      'server such as nginx to serve your static files. See the "deployment" ' +
      'section in the README for more information on deployment strategies.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()));
}

module.exports = app;

