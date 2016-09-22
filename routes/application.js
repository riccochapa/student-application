var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var Profile = require('../models/profile.js');

router.get('/', ensureLoggedIn, function(req, res, next) {
  Profile.findOne({
    id: req.user.id
  }, function(err, profile) {
    res.render('application/index', {
        profile: profile,
        user: req.user
    });
  });
});

router.get('/status', ensureLoggedIn, function(req, res, next) {
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
