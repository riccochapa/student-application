var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var Profile = require('../models/profile.js');

  router.get('/', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
      if (!profile)
        res.redirect('/profile/create');
      else
        res.render('home', {
            profile: profile,
            user: req.user
        });
    });
  });

module.exports = router;
