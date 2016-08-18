var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var applicant = require('../models/applicant.js');

router.get('/', ensureLoggedIn, function(req, res, next){
  applicant.find({
    'applicant.applicantId.auth0': req.user.id
  }, function(err, docs){
    res.render('profile/index', {profile:docs,user:req.user});
    });
});

router.get('/create_profile', ensureLoggedIn, function(req, res, next){
  applicant.find({
    'applicant.applicantId.auth0': req.user.id
  }, function(err, docs){
    res.render('profile/create_profile', {profile: docs, user: req.user});
  });
});

router.post('/create_profile', ensureLoggedIn, function(req, res, next){
  var applicant = new Applicant({

    // ???

  });
  applicant.save(function(err){
    if (err) res.send('profile save error ' + err);
    else res.redirect('/profile');
  });
});

module.exports = router;
/*
applicant: [{
applicantId: {type: String, required: true},
applicantProfile: [{
  name: [{
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    preferredName: {type: String, required: false},
    userName: {type: String, required: true}
  }],
  stats: [{
    gender: {type: String, required: true},
    age: {type: String, required: true},
    ethnicity: {type: String, required: true},
  }],
  contactInfo: [{
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
  }],
  socialMedia: [{
    Github: {type: String, required: false},
    Facebook: {type: String, required: false},
    Twitter: {type: String, required: false},
  }],
  avatar: [{
    photo: {String, required: false},
  }],
}],
*/
