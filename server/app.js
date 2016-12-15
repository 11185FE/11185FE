const express = require('express');
const glob = require('glob');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const expressVue = require('express-vue');
const DB = require('./db');
var env = process.env.NODE_ENV || 'production';

var app = express();

//view engine


app.set('port', (process.env.PORT || 80));
app.set('views', path.join(__dirname, './views'));
app.set('vue', {
    componentsDir:  path.join(__dirname, './views/components'),
    defaultLayout: 'layout'
});
app.engine('vue', expressVue);
app.set('view engine', 'vue');






//middlewares
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(cookieParser());
// app.use(session({
//   name: 'boomshakalaka',
//   secret: '233',
//   cookie: { maxAge: 60*1000*100 }
// }));
// app.use(compress());
// app.use(methodOverride());


//assets
app.use('/assets',express.static(path.join(__dirname, 'views/assets')))


//ctrls routes
var routes = glob.sync('./ctrls/**.js', { cwd: __dirname });
routes.forEach(function (route) {
  require(route)(app);
});




//errors
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// if (env === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send({ err:err.message })
//   });
// }

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  throw err;
});




app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


