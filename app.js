var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Auth0Strategy = require('passport-auth0');
var dotenv = require('dotenv');
var session = require('express-session');
var helmet = require('helmet');

dotenv.load();

const MONGO_PASS = process.env.MONGO_DB_PASS;
const MONGO_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST;
const MONGO_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT;

var mongoose = require('mongoose');
if (MONGO_HOST) {
    mongoose.connect('mongodb://admin:' + MONGO_PASS + '@' + MONGO_HOST + ':' + MONGO_PORT + '/applications');
} else {
    mongoose.connect('mongodb://localhost/applications');
}

var routes = require('./routes/index');
var home = require('./routes/home');
var admin = require('./routes/admin');
var application = require('./routes/application');
var profile = require('./routes/profile');
var questions = require('./routes/questionaire');

var strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
}, function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
});

passport.use(strategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './public')));


app.use('/', routes);
app.use('/home', home);
app.use('/admin', admin)
app.use('/application', application);
app.use('/profile', profile);
app.use('/questionaire', questions);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
