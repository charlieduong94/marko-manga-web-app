var mangaApp = require('src/view/app/manga');

module.exports = require('marko-widgets').defineComponent({
  template : require('./template.marko'),
  getInitialState : function(input, out){
    console.log('inital props');
    console.log(input);
    return{
      sidebarHidden : true,
      latest : input.state
    };
  },
  getTemplateData : function(state){
    console.log('template data state');
    console.log(state);
    return {
      sidebarHidden : state.sidebarHidden,
      latest : state.latest
    };
  },
  init : function(){
    console.log('main init')
    console.log(this.state);
    mangaApp.onChange((state) => {
      console.log('stateChange');
      if(state.sidebarHidden != this.state.sidebarHidden)
        this.setState('sidebarHidden', state.sidebarHidden);
    });
  },
  onFilterClick(){
    mangaApp.toggleSidebar();
  }
});
