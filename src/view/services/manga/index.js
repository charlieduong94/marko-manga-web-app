/**
 *  Client side service used for grabbing data from server
 **/
var mangaApp = require('src/view/app/manga');
module.exports = {
  getLatestManga : function(page){
    return new Promise((resolve, reject) => {
      $.ajax({
        url : '/manga/latest-updates?limit=25&page=' + page,
        method : 'GET'
      }).done((result) => {
        resolve(result);
      }).fail((err) => {
        reject(err);
      });
    });
  },
  getPopularManga : function(page){
    return new Promise((resolve, reject) => {
      $.ajax({
        url : '/manga/popular?limit=25&page=' + page,
        method : 'GET'
      }).done((result) => {
        resolve(result);
      }).fail((err) => {
        reject(err);
      });
    });
  }
};
