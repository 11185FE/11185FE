const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = mongoose.model('Blog', new Schema({
  name: String,
  path: String,
  tags: Array,
  source: String,
  creatdDate: {type:Date,default:Date.now},
  updateDate: {type:Date,default:Date.now}
}));
