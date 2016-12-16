const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema =  new Schema({
    username:{type:String},
    pw: {type:String},
    createdDate: { type: Date, default: Date.now },
    loginDate:Date,
    
})
var User = mongoose.model('User',UserSchema);


module.exports= {
    schema:UserSchema
}