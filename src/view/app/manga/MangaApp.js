'use strict';
/**
 *  Class definition that represents the Manga App
 **/
const EventEmitter = require('events').EventEmitter;
const MangaAppState = require('./MangaAppState');
const mangaService = require('src/view/services/manga');
class MangaApp extends EventEmitter{
  constructor(state){
    console.log(state);
    super();
    this.state = new MangaAppState(state);
    // emit a state change
    this.state.on('change', () => {
      console.log('change detected');
      this.emit('change', this.state);
    });
    // if this was not rendered serverside, sync data
    if(!state.serverSideRender){
      this.getLatestManga(0);
    }
  }
  onChange(callback){
    console.log('on change callback added');
    this.on('change', callback);
  }
  toggleSidebar(){
    console.log('toggling');
    // invert sidebar
    this.state.set('sidebarHidden', !this.state.sidebarHidden);
  }
  getLatestManga(page){
    mangaService.getLatestManga(page).then((result) => {
      this.state.set('latest', result);
    })
  }
  getState(){
    return this.state;
  }
}
module.exports = MangaApp;
