var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mangaSchema = new Schema({
  _id : String,
  title : String,
  alias : String,
  image : String,
  hits : Number,
  last_chapter_date : Number,
  status : Number,
  category : [String]
});

var Manga = mongoose.model("Manga", mangaSchema);
module.exports =  Manga;
