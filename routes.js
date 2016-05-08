/**
 *  Routes are applied in this file
 **/
exports.addRoutes = function(app){
  app.use('/manga', require('src/api/controllers/routes/manga'));
  app.get('/', require('src/view/pages/main'));
};
