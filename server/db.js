const mongoose = require('mongoose');
const config = require('./config');
mongoose.connect(config.dburl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',  console.error.bind(console, 'connection success'));