'use strict';
const Promise = require('bluebird');
const MangaDao = require('src/api/models/daos/MangaDao');
var mangaDao = new MangaDao();
function setPagingOptions(options){
  return new Promise((resolve,reject) => {
    console.log(options);
    let limit = options.limit, page = options.page;
    if(limit === undefined || limit === null || isNaN(parseInt(limit))){
      console.log('got here');
      return reject({
        code : 15,
        status : 400,
        error : 'Invalid value for "limit"'
      });
    }
    if(limit === undefined || limit === null || isNaN(parseInt(page))){
      return reject({
        code : 16,
        status : 400,
        error : 'Invalid value for "page"'
      });
    }
    resolve({
      'limit' : parseInt(limit),
      'page' : parseInt(page)
    });
  });
}
class MangaService{
  /**
   *  Gets the latest updated manga
   *  @param {number} options.limit - the number of results to return
   *  @param {number} options.page - the page to retrieve (starts at 0)
   **/
  getLatestUpdates(options){
    return new Promise((resolve, reject) => {
      setPagingOptions({
        'limit' : options.limit,
        'page' : options.page
      }).then((pagingOptions)=>{
        console.log(pagingOptions);
        return mangaDao.getLatestUpdates(pagingOptions);
      }).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   *  Gets the most popular manga
   *  @param {number} options.limit - the number of results to return
   *  @param {number} options.page - the page to retrieve (starts at 0)
   **/
  getMostPopular(options){
    return new Promise((resolve, reject) => {
      setPagingOptions(options).then((pagingOptions)=>{
        return mangaDao.getMostPopular(pagingOptions);
      }).then((results) => {
        resolve(results)
      }).catch((error) => {
        reject(error)
      });
    });
  }
}

module.exports = MangaService;
