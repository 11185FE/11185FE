const mongoose = require('mongoose');
const config = require('./config');
console.info(config.DBURL)
mongoose.connect(config.DBURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',  console.error.bind(console, 'connection success'));