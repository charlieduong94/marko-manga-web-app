'use strict';
const express = require('express');
var MangaService = require('src/api/services/MangaService');
var mangaService = new MangaService();
var router = express.Router();

router.get('/latest-updates', (req, res) => {
  console.log('this route got hit');
  mangaService.getLatestUpdates({
    'limit' : req.query.limit,
    'page' : req.query.page
  }).then((result) => {
    res.send(result);
  }).catch((error) =>{
    res.status(error.status).send(error);
  });
});

router.get('/most-popular', (req, res) => {
  mangaService.getMostPopular({
    'limit' : req.query.limit,
    'page' : req.query.page
  }).then((result) => {
    res.send(result);
  }).catch((error) =>{
    res.status(error.status).send(error);
  });
});

module.exports = router;
