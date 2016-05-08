var mangaApp = require('src/view/app/manga');
module.exports = require('marko-widgets').defineComponent({
  template : require('./template.marko'),
  getInitialState : function(input){
    return {};
  },
  handleToggleClick : function(){
    console.log('clicked');
    mangaApp.toggleSidebar();
  }
});
