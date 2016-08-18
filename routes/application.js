var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var application = require('../models/application.js');

router.get('/', ensureLoggedIn, function(req, res, next){
  application.find({
    'application.id.auth0': req.user.id
  }, function(err, docs){
    res.render('application/index', {application:docs,user:req.user});
    });
});

router.get('/submit_application', ensureLoggedIn, function(req, res, next){
  application.find({
    'application.id.auth0': req.user.id
  }, function(err, docs){
    res.render('application/submit_application', {application: docs, user: req.user});
  });
});

module.exports = router;
