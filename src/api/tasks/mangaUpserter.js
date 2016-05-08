const cron = require('node-cron');
const request = require("request");
const MangaDao = require('src/api/models/daos/MangaDao');
const config = require('config.json')
var mangaDao = new MangaDao();
cron.schedule('*/15 * * * *',function(){
  console.log('Starting cron job....')
  request("https://www.mangaeden.com/api/list/0/", function (error, response, body){
    if(error){
      console.log("Error made in request");
    }
    else{
      var manga = JSON.parse(body).manga;
      mangaDao.bulkUpsert(manga).then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    }
  });
});
