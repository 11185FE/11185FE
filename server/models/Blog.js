const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = mongoose.model('Blog', new Schema({
  title: String,
  path: String,
  date: String,
  tags: Array,
  source: String,
  creatdDate: {type:Date,default:Date.now},
  updateDate: {type:Date,default:Date.now}
}));
