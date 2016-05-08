var mangaApp = require('src/view/app/manga');

module.exports = require('marko-widgets').defineComponent({
  template : require('./template.marko'),
  getInitialState : function(input, out){
    console.log('state');
    console.log(input);
    return input;
  },
  getInitialProps : function(input, out){
    console.log('props');
    console.log(input);
    return input.state;
  },
  getTemplateData : function(state){
    console.log('input');
    return state;
  },
  init : function(){
    console.log('init');
    console.log(this.state);
  },
  onUpdate : function(){
    console.log('updated');
  }
});
