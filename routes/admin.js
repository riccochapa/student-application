var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var Review = require('../models/review.js');


router.get('/', ensureLoggedIn, function(req, res, next) {
  var Questionaire = require('../models/questionaire.js');
  var Profile = require('../models/profile.js');
  var Admin = require('../models/admin.js');

  Admin.findOne({ id : req.user.id }, function (err, admin) {
      Questionaire.find( function (err, questionaire) {
          Profile.find( function (err, profile) {
            if (!admin)
            res.redirect('/home');
            else
            res.render('admin/index', {
              profile : profile,
              questionaire : questionaire,
              admin: admin,
              user: req.user
          });
        });
      });
  });
});

router.get('/review/:applicantid', ensureLoggedIn, function(req, res, next) {
  var Questionaire = require('../models/questionaire.js');
  var Profile = require('../models/profile.js');
  var Admin = require('../models/admin.js');
  var applicantid = req.params.applicantid;

    Admin.findOne( { id: req.user.id }, function (err, admin) {
      Questionaire.find({ id: req.params.applicantid }, function (err, questionaire) {
        Profile.find({ id: req.params.applicantid }, function (err, profile)   {
          if (!admin)
          res.redirect('/home');
          else
          res.render('admin/review', {
              profile : profile,
              questionaire : questionaire,
              admin: admin,
              user: req.user
          });
        });
      });
  });
});


router.get('/accepted/:applicantid', ensureLoggedIn, function(req, res, next) {
  var Questionaire = require('../models/questionaire.js');
  var Profile = require('../models/profile.js');
  var Admin = require('../models/admin.js');
  var applicantid = req.params.applicantid;

    Admin.findOne( { id: req.user.id }, function (err, admin) {
      Questionaire.find({ id: req.params.applicantid }, function (err, questionaire) {
        Profile.find({ id: req.params.applicantid }, function (err, profile)   {
          if (!admin)
          res.redirect('/home');
          else
          res.render('admin/accepted', {
              profile : profile,
              questionaire : questionaire,
              admin: admin,
              user: req.user
          });
        });
      });
  });
});

router.get('/waitlisted/:applicantid', ensureLoggedIn, function(req, res, next) {
  var Questionaire = require('../models/questionaire.js');
  var Profile = require('../models/profile.js');
  var Admin = require('../models/admin.js');
  var applicantid = req.params.applicantid;

    Admin.findOne( { id: req.user.id }, function (err, admin) {
      Questionaire.find({ id: req.params.applicantid }, function (err, questionaire) {
        Profile.find({ id: req.params.applicantid }, function (err, profile)   {
          if (!admin)
          res.redirect('/home');
          else
          res.render('admin/waitlisted', {
              profile : profile,
              questionaire : questionaire,
              admin: admin,
              user: req.user
          });
        });
      });
  });
});

router.get('/alternative/:applicantid', ensureLoggedIn, function(req, res, next) {
  var Questionaire = require('../models/questionaire.js');
  var Profile = require('../models/profile.js');
  var Admin = require('../models/admin.js');
  var applicantid = req.params.applicantid;

    Admin.findOne( { id: req.user.id }, function (err, admin) {
      Questionaire.find({ id: req.params.applicantid }, function (err, questionaire) {
        Profile.find({ id: req.params.applicantid }, function (err, profile)   {
          if (!admin)
          res.redirect('/home');
          else
          res.render('admin/alternative', {
              profile : profile,
              questionaire : questionaire,
              admin: admin,
              user: req.user
          });
        });
      });
  });
});

module.exports = router;
