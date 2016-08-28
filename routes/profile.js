var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

var Profile = require('../models/profile.js');

router.get('/', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('profile/index', {
            profile: profile,
            user: req.user
        });
    });
});

router.get('/create_profile', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('profile/create_profile', {
            profile: profile,
            user: req.user
        });
    });
});

router.post('/create_profile', ensureLoggedIn, function(req, res, next) {

    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        if (err) return next(err);

        if (!profile) profile = new Profile({
            id: req.user.id
        });

        for (let prop in req.body) {
            profile[prop] = req.body[prop];
        }
        profile.save(function(err) {
            if (err) return next(err);
            res.redirect('profile/profile_details');
        });
    });

});

router.get('/profile_details', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('profile/profile_details', {
            profile: profile,
            user: req.user
        });
    });
});

router.post('/profile_details', ensureLoggedIn, function(req, res, next) {

    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        if (err) return next(err);

        if (!profile) profile = new Profile({
            id: req.user.id
        });

        for (let prop in req.body) {
            profile[prop] = req.body[prop];
        }
        profile.save(function(err) {
            if (err) return next(err);
            res.redirect('/profile');
        });
    });

});

module.exports = router;
