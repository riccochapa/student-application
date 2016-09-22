var express = require('express');
var passport = require('passport');
var router = express.Router();
var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL
};

router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Login',
      env: env
  });
});

router.get('/boot', function(req, res, next) {
  res.render('index/boot', {
      env: env
  });
});

router.get('/codergv', function(req, res, next) {
  res.render('index/codergv', {
      env: env
  });
});

router.get('/login', function(req, res) {
  res.render('login', {
      env: env
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

router.get('/callback', passport.authenticate('auth0', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/home');
});

module.exports = router;
