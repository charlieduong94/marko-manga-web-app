/**
 *  Route for serving main page
 **/
const MangaService = require('src/api/services/MangaService');
var mangaService = new MangaService();
var MangaAppState = require('src/view/app/manga/MangaAppState');
var template = require('./template.marko');
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  template.render({
    // pass in a provider, which will be used to set the initial state of the application
    mangaStateProvider : function mangaStateProvider(callback){
      mangaService.getLatestUpdates({
        limit : 25,
        page : 0
      }).then((result) => {
        let appState = new MangaAppState({
          serverSideRender : true,
          latest : result,
          sidebarHidden : true
        });
        console.log('render');
        console.log(appState);
        callback(null, appState);
      }).catch((error) => {
        console.log(error);
        callback(error);
      });
    }
  }, res); // pipe output to response
};
