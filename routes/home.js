var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

router.get('/', ensureLoggedIn, function(req, res, next) {
    res.render('home', {
        user: req.user
    });
});

module.exports = router;
