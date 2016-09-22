var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var passport = require('passport');
var express = require('express');
var questionJSON = require('../question.json');
var router = express.Router();
var Questionaire = require('../models/questionaire.js');

router.get('/', ensureLoggedIn, function(req, res, next) {
  var questions = questionJSON.questions;
    Questionaire.findOne({
      id: req.user.id
    }, function(err, questionaire) {
      if (!questionaire)
      res.render('questionaire/index', {
          user: req.user,
          questionaire: questionaire,
          questions: questions,
      });
      else
      res.redirect('/questionaire/submit');
    });
});

router.get('/completed', ensureLoggedIn, function(req, res, next) {
    Questionaire.findOne({
      id: req.user.id,
    }, function(err, questionaire) {
        res.render('questionaire/completed', {
            user: req.user,
            questionaire: questionaire,
        });
    });
});

router.post('/completed', ensureLoggedIn, function(req, res, next) {
  var Profile = require('../models/profile.js');

    Profile.findOneAndUpdate({
      id: req.user.id,
    }, { $set: { application: {
          'status': req.body.status
        }}}, { upsert : true },
    function(err, profile) {
        if (err) return next(err);
        res.redirect('/questionaire/submit');
      });
});

router.get('/submit', ensureLoggedIn, function(req, res, next) {
    Questionaire.findOne({
      id: req.user.id,
    }, function(err, questionaire) {
        res.render('questionaire/submit', {
            user: req.user,
            questionaire: questionaire,
            id: req.user.id,
            _id: req.params.id
        });
    });
});

router.get('/:number', ensureLoggedIn, function(req, res, next) {
  var questionNumber = req.params.number;
  var questions = questionJSON.questions;
  var question = questions[questionNumber - 1];
  var statement = questions.statement;
  var number = questions.number;
  var keywords = questions.keywords;
  var image = questions.image;

    Questionaire.findOne({
      id: req.user.id
    }, function(err, questionaire) {
        if (!question)
        res.redirect('/questionaire/completed');
        else
        res.render('questionaire/number', {
          questionaire: questionaire,
          questions: questions,
          statement: statement,
          question: question,
          keywords: keywords,
          number: number,
          image: image,
          user: req.user
        });
    });
});

router.post('/:number', ensureLoggedIn, function(req, res, next) {
  var questionNumber = req.params.number;
  var questions = questionJSON.questions;
  var question = questions[questionNumber - 1];
  var statement = questions.statement;
  var number = questions.number;
  var keywords = questions.key_words;
  var image = questions.image;

  Questionaire.findOneAndUpdate({
    id: req.user.id
  }, { $push: { question: {
        'number': question.number,
        'statement': question.statement,
        'response': req.body.response,
        'user': req.user.id
      }}}, { upsert : true },
  function(err, questionaire) {
      if (err) return next(err);
      res.redirect('/questionaire/' + [question.number + 1]);
    });
});

router.get('/edit/:num', ensureLoggedIn, function(req, res, next) {
  var num = req.params.num;

  Questionaire.findOne({ id: req.user.id },
    function(err, questionaire) {
      if (err) return next(err);
        res.render('questionaire/edit', {
          questionaire: questionaire,
          number: questionaire.question[num -1].number,
          statement: questionaire.question[num -1].statement,
          response: questionaire.question[num -1].response,
          user: req.user.id
        });
    });
});

router.post('/edit/:num', ensureLoggedIn, function(req, res, next) {
  var num = req.params.num;

  Questionaire.findOneAndUpdate( { question: {$elemMatch: { number: req.params.num, user: req.user.id }}
  }, { $set: { 'question.$.response': req.body.response }},
    function (err, questionaire) {
    if (err) return next(err);
      res.redirect('/questionaire/submit');
    });
});

module.exports = router;
