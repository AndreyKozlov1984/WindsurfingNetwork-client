const argv = require('yargs').argv;
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const project = require('./project.config');
const debug = require('debug')('app:config:webpack');
const path = require('path');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

debug('Creating configuration.');
const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve: {
    modules : [
      project.paths.client(),
      'node_modules',
    ],
  },
  module : {},
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = {
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: '[name]-[hash:8].js',
  chunkFilename: '[name]-[chunkhash:8].js',
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path,
};

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  /*new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 2,
  }),*/
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    inject: true,
    production: __PROD__,
    minify: __PROD__ && {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  new ExtractTextPlugin({ filename: 'styles.css', allChunks: true, disable: __DEV__ }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async',
  }),
  // preload chunks
  new PreloadWebpackPlugin(),
];

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        );
      }
    });
  });
}

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      mangle: true,
      beautify: true // use true for debugging
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    })
  );
}

// Don't split bundles during testing, since we only want import one bundle

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfig.module.rules = [{
  test    : /\.(js|jsx)$/,
  include : [
    path.resolve(__dirname, '../src/'),
    path.resolve(__dirname, '../test/'),
  ],
  use  : {
    loader: 'babel-loader',
    options: project.compiler_babel,
  },
}, {
  test: /\.js$/,
  include: [
    path.resolve(__dirname, '../src/'),
    path.resolve(__dirname, '../test/'),
  ],
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {},
  },
}, {
  test    : /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader?sourceMap&-minimize',
      { loader: 'sass-loader?sourceMap',
        options: {
          includePaths : [ project.paths.client('styles') ],
          sourceMap: true,
        },
      },
    ],
  }),
}, {
  test    : /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader?sourceMap&-minimize',
    ],
  }),
},
/* eslint-disable */
  { test: /\.woff(\?.*)?$/,  use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   use: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   use: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    use: 'url-loader?limit=8192' }
/* eslint-enable */
];
module.exports = webpackConfig;
