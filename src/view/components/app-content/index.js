var mangaApp = require('src/view/app/manga');

module.exports = require('marko-widgets').defineComponent({
  template : require('./template.marko'),
  getInitialState : function(input, out){
    return input.state;
  },
  getTemplateData : function(input){
    return {
      latest : input
    };
  },
  init : function(){
    console.log('content init');
  },
  onUpdate : function(){
    console.log('updated');
  }
});
