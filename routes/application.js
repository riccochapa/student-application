var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var Application = require('../models/application.js');

router.get('/', ensureLoggedIn, function(req, res, next) {
    Application.findOne({
        id: req.user.id
    }, function(err, application) {
        res.render('application/index', {
            application: application,
            user: req.user
        });
    });
});

router.get('/status', ensureLoggedIn, function(req, res, next) {
  var Profile = require('../models/profile.js');
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('application/status', {
            profile: profile,
            user: req.user
        });
    });
});

module.exports = router;
