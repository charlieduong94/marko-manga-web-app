'use strict';
const Promise = require('bluebird');
const Manga = require('src/api/models/schema/Manga');

class MangaDao{
  /**
   *  @param {number} options.limit - the number of results to return
   *  @param {number} options.page - the page to retrieve (starts at 0)
   **/
  getMostPopular(options){
    return new Promise((resolve, reject) => {
      let {limit, page} = options;
      Manga.find().sort({hits : -1}).limit(limit).skip(limit * page).exec(function(err, result){
        if(err){
          reject({
            code : 1,
            status : 500,
            res : 'Unable to retrieve manga'
          });
        }
        else{
          resolve(result);
        }
      });
    });
  }
  /**
   *  @param {number} options.limit - the number of results to return
   *  @param {number} options.page - the page to retrieve (starts at 0)
   **/
  getLatestUpdates(options){
    return new Promise((resolve, reject) => {
      let {limit, page} = options;
      Manga.find({last_chapter_date : {$ne : null}}).sort({last_chapter_date : -1})
      .limit(limit).skip(limit * page).exec(function(err, result){
        if(err){
          reject({
            code : 1,
            status : 500,
            res : 'Unable to retrieve manga'
          });
        }
        else{
          resolve(result);
        }
      });
    });
  }
  /**
   *  @param {number} options.limit - the number of results to return
   *  @param {number} options.page - the page to retrieve (starts at 0)
   *  @param {string} options.query - the search query
   **/
  search(options){
    return new Promise((resolve, reject) => {
      let {limit, page, query} = options;
      Manga.find({title : new RegExp(query, 'i')}).sort({hits : -1}).limit(limit).skip(limit * page)
      .exec(function(err, result){
        if(err){
          reject({
            code : 1,
            status : 500,
            res : 'Unable to retrieve manga'
          });
        }
        else{
          resolve(result);
        }
      });
    });
  }
  /**
   * @param {array} data - the array of manga retrieved
   **/
  bulkUpsert(data){
    return new Promise((resolve, reject) => {
      console.log(data);
      let bulk = Manga.collection.initializeUnorderedBulkOp()
      data.forEach((manga) => {
        bulk.find({
          '_id' : manga.i
        }).upsert().updateOne({
          isNew : false,
          _id : manga.i,
          title : manga.t,
          hits : manga.h,
          image : manga.im,
          last_chapter_date : manga.ld,
          alias : manga.a,
          status : manga.s,
          category : manga.c,
        });
      });
      bulk.execute((err, result) => {
        if(err)
          reject(err)
        else
          resolve(result);
      })
    });
  }
}

module.exports = MangaDao;
