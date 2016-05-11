var mangaApp = require('src/view/app/manga');

module.exports = require('marko-widgets').defineComponent({
  template : require('./template.marko'),
  getInitialState : function(input, out){
    return {
      manga : input.manga,
      id : input.id,
      currentXPos : 0
    };
  },
  getTemplateData : function(state, input){
    console.log('input: ');
    console.log(input);
    return {
      id : state.id,
      title : input.title,
      manga : state.manga
    };
  },
  init : function(){
    console.log('content init');
    $('#' + this.state.id).scroll(() => {
      let scrollPos = $('#' + this.state.id).scrollLeft();
      let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      console.log(scrollPos);
      console.log(width);
      if(scrollPos === 0){
        // hide left button
        console.log('hide left!');
      }
      else if((scrollPos + width) >= 1000){
        // hide right button
        console.log('hide!');
      }
    })
  },
  onLeftArrowClick : function(){
    if(!this.state.scrolling){
      this.state.scrolling = true;
      var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      let { id, currentXPos } = this.state;
      currentXPos -= width;
      console.log(width);
      if(currentXPos < 0)
        currentXPos = 0;
      this.state.currentXPos = currentXPos; // update state
      $('#' + id).animate({
        scrollLeft : currentXPos
      }, 'slow', () => {
        this.state.scrolling = false;
      });
      console.log(currentXPos);
    }
  },
  onRightArrowClick : function(){
    if(!this.state.scrolling){
      this.state.scrolling = true;
      let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      let { id, manga, currentXPos} = this.state;
      let maxWidth = $('#' + id + ' div').width() * manga.length;

      console.log(manga);
      console.log(maxWidth);
      currentXPos += width;
      if(currentXPos > maxWidth)
        currentXPos = maxWidth;
      console.log(width);
      this.state.currentXPos = currentXPos; // update state
      $('#' + id).animate({
        scrollLeft : currentXPos
      }, 'slow', () => {
        this.state.scrolling = false;
      });
      console.log(currentXPos);
    }
  },
  onUpdate : function(){
    console.log('updated');
  }
});
