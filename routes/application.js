var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var Application = require('../models/application.js');

router.get('/', ensureLoggedIn, function(req, res, next){
  Application.findOne({ id: req.user.id }, function(err, application){
    res.render('application/index', { application: application, user: req.user});
    });
});

router.get('/submit_application', ensureLoggedIn, function(req, res, next){
  Application.findOne({ id: req.user.id }, function(err, application){
    res.render('application/submit_application', { application: application, user: req.user });
  });
});

router.post('/submit_application', ensureLoggedIn, function(req, res, next){

  Application.findOne({ id: req.user.id }, function(err, application){
    if (err) return next(err);

    if (!application) application = new Application({ id: req.user.id });

    for (let prop in req.body) {
      application[prop] = req.body[prop];
    }
    application.save(function(err){
      if (err) return next(err);
      res.redirect('/application')
    });
  });

});

module.exports = router; 
