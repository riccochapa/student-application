var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var passport = require('passport');
var express = require('express');
var questionJSON = require('../question.json');
var router = express.Router();

var Questionaire = require('../models/questionaire.js');

router.get('/', ensureLoggedIn, function(req, res, next){
	var questions = questionJSON.questions;

	Questionaire.findOne({ id: req.user.id }, function(err, questions){
		res.render('questions/index', {
			user: req.user,
			questions: questions
		});
	});

});

router.get('/:number', ensureLoggedIn, function(req, res, next){
	var questionNumber = req.params.number;
	var questions = questionJSON.questions;
	var question = questions[questionNumber - 1];
	var statement = questions.statement;
	var keywords = questions.key_words;
	var image = questions.image;

	Questionaire.findOne({ id: req.user.id }, function(err, questions){
		if (question >= 1 && question <= 6) return;
		  res.render('questions/number', {
				user: req.user,
				questions : questions,
				statement : statement,
				question : question,
				keywords : keywords,
				image : image
		});
	});

});

router.post('/:number', ensureLoggedIn, function(req, res, next){
	var questionNumber = req.params.number;
	var questions = questionJSON.questions;
	var question = questions[questionNumber - 1];
	var statement = questions.statement;

  Questionaire.findOne({ id: req.user.id }, function(err, questions){
    if (err) return next(err);

    if (!questions) questions = new Questionaire({ id: req.user.id	});

    for (let prop in req.body) {
      questions[prop] = req.body[prop];
    }
    questions.save(function(err){
      if (err) return next(err);
			res.redirect('/questions');
    });

	});

});

module.exports = router;
