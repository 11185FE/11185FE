const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TestObj = mongoose.model('TestObj', new Schema({
    boom: String,
    date: Date
}));
