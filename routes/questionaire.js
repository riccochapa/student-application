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
        res.render('questionaire/index', {
            user: req.user,
            questionaire: questionaire,
            questions: questions,
        });
    });
});

router.get('/submit', ensureLoggedIn, function(req, res, next) {

    Questionaire.findOne({
        id: req.user.id,
    }, function(err, questionaire, question, response) {
        res.render('questionaire/submit', {
            user: req.user,
            questionaire: questionaire,
            question: question,
            response: response
        });
    });
});

router.get(':id', ensureLoggedIn, function(req, res, next){
  Questionaire.findOne({
    // ?????
  }, function(err, questionaire, question, response){
    if (err) return next(err);
    res.render('questionaire/edit', {
      questionaire: questionaire,
      question: question,
      response: response,
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
        res.redirect('/questionaire/submit');
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
          "number": question.number,
          "statement": question.statement,
          "response": req.body.response,
          "responseIf": req.body.responseIf
        }}}, { upsert : true },
    function(err, questionaire) {
        if (err) return next(err);
        res.redirect('/questionaire/' + [question.number + 1]);
      });
});


module.exports = router;
