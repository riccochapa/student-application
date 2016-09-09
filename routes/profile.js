var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var Profile = require('../models/profile.js');
var router = express.Router();

router.get('/', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('profile/index', {
            profile: profile,
            user: req.user,
        });
    });
});

router.post('/', ensureLoggedIn, function(req, res, next) {
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
            res.redirect('/profile/edit');
        });
    });
});

router.get('/create', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('profile/create', {
            profile: profile,
            user: req.user
        });
    });
});

router.post('/create', ensureLoggedIn, function(req, res, next) {

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
            res.redirect('/profile/edit');
        });
    });

});

router.get('/edit', ensureLoggedIn, function(req, res, next) {
    Profile.findOne({
        id: req.user.id
    }, function(err, profile) {
        res.render('profile/edit', {
            profile: profile,
            user: req.user
        });
    });
});

router.post('/edit', ensureLoggedIn, function(req, res, next) {

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
