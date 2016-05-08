'use strict';

const EventEmitter = require('events').EventEmitter;
/**
 *  Class that represents the state of the Manga Application
 **/
class MangaAppState extends EventEmitter{
  constructor(state){
    super();
    console.log(state);
    if(!state)
      state = {manga : {}};
    // set attributes here
    this.manga = {};
    this.sidebarHidden = state.sidebarHidden || true;
    this.latest = state.latest || [];
    this.popular = state.popular || [];
    this.latestPage = state.latestPage || 0;
    this.popularPage = state.popularPage || 0;
  }
  /**
   *  Changes one of the state properties
   *
   *  @param {string} name - the name of the property to Changes
   *  @param {Object}
   **/
  set(key, value){
    console.log(key);
    console.log(value);
    console.log(this[key]);
    let currentValue = this[key];
    if(currentValue === value)
      return;
    this[key] = value;
    this.emit('change'); // emit a change event for the application to handle
  }
}
module.exports = MangaAppState;
