const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./User').schema;
var Job = mongoose.model('Job', new Schema({
    name: String,
    needDoneDate:Date,
    desc:String,
    
    teamers:[String],
    creatdDate: {type:Date,default:Date.now},
    
    doneDate:Date,


}));

