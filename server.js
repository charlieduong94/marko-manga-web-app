'use strict';
/**
 *  Entry point for everything server side
 **/
// require all dependencies
// add babel preset so that all files can be transpiled
require('babel-core/register')({
  presets : ['es2015']
});
// set path for cleaner requires
require('app-module-path').addPath(__dirname);
require('marko/node-require').install();
require('lasso/node-require-no-op').enable('.less', '.css');
require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less');
const config = require('config.json');
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const compression = require('compression');
const serveStatic = require('serve-static');
// add lasso config
require('lasso').configure({
  require : {
    babel : {
      extensions : ['es6', 'js']
    }
  },
  plugins : [
    'lasso-less',
    'lasso-marko'
  ],
  outputDir : __dirname + '/static',
  bundlingEnabled : false,
  bundles : [
    {
      name : 'jquery',
      dependencies : [
        'require: jquery'
      ]
    }
  ]
});

// init connections
var app = express();
var redis = new Redis(config.redis);
mongoose.connect(config.mongo);
var mongoDB = mongoose.connection;
// configure port
var port = process.argv[2] || 8000;
// listen for connection events to ensure that everything is ok
redis.on('connect', () => {
  mongoDB.on('open', () => {
    // enable gzip compresion
    app.use((req, res, next) => {
      console.log(req.url);
      next();
    });

    // add routes
    require('routes').addRoutes(app);
    app.use('/static', serveStatic(__dirname + '/static'));
    app.listen(port, () => {
      console.log('Server listening on port ' + port + '...');
      if(process.send) { // for browser-refresh
        process.send('online');
      }
    });
    //app.use(require('src/view/pages/error'));
    // add cron job
    require('src/api/tasks/mangaUpserter');
  })
});
