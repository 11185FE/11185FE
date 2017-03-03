const express = require('express');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer()
const MdsLoader = require('./libs/loader/mds');
const DB = require('./db');
var env = process.env.NODE_ENV || 'production';
var app = express();

app.set('port', (process.env.PORT || 80));

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    name: 'boomshakalaka',
    secret: '233',
    cookie: { maxAge: 60 * 1000 * 100 }
}));
app.use(compress());
app.use(methodOverride());



//comps
var comps = glob.sync('./views/components/*.js', { cwd: __dirname });
comps.forEach(function (comp) {
    require(comp);
});

//view engine
app.set('views', path.join(__dirname, './views'));
app.engine('html', function (filePath, options, callback) {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            callback(new Error(err));
            return;
        }
        options.template = content;
        var app = new Vue(options);
        renderer.renderToString(app, function (err, html) {
            if (err) {
                callback(new Error(err));
            }
            callback(null, html);
        })
    })

});
app.set('view engine', 'html');





//assets
app.use('/', express.static(path.join(__dirname, 'views')))

//models
var models = glob.sync('./models/*.js', { cwd: __dirname });
models.forEach(function (model) {
    require(model);
});

//ctrls routes
var routes = glob.sync('./ctrls/*.js', { cwd: __dirname });
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
