var mangaApp = require('src/view/app/manga');

module.exports = require('marko-widgets').defineComponent({
  template : require('./template.marko'),
  getInitialState : function(input){
    return{
      sidebarHidden : true
    };
  },
  getTemplateData : function(state){
    return state;
  },
  init : function(){
    console.log('sidebar mounted');
    mangaApp.onChange((state)=>{
      console.log('changing!');
      if(state.sidebarHidden != this.state.sidebarHidden){
        console.log('change!');
        console.log(this);
        this.setState('sidebarHidden', state.sidebarHidden);
      }
    });
  }
});
