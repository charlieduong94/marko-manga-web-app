// bluebird polyfill
console.log('this got loaded');
window.Promise = require('bluebird');

var MangaApp = require('./MangaApp');
var app = new MangaApp({}); // fill in state

module.exports = window.app = app;

window.addEventListener('load', function load(event){
  window.removeEventListener('load', load);
  var url = document.location.toString();
})
