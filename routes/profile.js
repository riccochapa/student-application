var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var Profile = require('../models/profile.js');

router.get('/', ensureLoggedIn, function(req, res, next){
  Profile.find({ id: req.user.id }, function(err, docs){
    res.render('profile/index', {profile:docs,user:req.user});
  });
});

router.get('/create_profile', ensureLoggedIn, function(req, res, next){
  Profile.findOne({ id: req.user.id }, function(err, profile){
    res.render('profile/create_profile', {profile: profile, user: req.user});
  });
});

router.post('/create_profile', ensureLoggedIn, function(req, res, next){

  Profile.findOne({ id: req.user.id }, function(err, profile){
    if (err) return next(err);

    if (!profile) profile = new Profile({ id: req.user.id });

    for (let prop in req.body) {
      profile[prop] = req.body[prop];
    }

    profile.save(function(err){
      if (err) return next(err);
      res.redirect('/profile');
    });
  });

});










module.exports = router;
