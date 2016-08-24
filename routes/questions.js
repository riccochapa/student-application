var questionJSON = require('../question.json');
var router = require('express').Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();


router.get('/', ensureLoggedIn, function(req, res) {
	var questions = questionJSON.questions;

	res.render('questions/index', {
		title: "questions",
		questions : questions,
    user: req.user
	});
});

router.get('/:number', ensureLoggedIn, function(req, res, next) {
	var questionNumber = req.params.number;
	var questions = questionJSON.questions;
	var question = questions[questionNumber - 1];
  var statement = questions.statement;
  var keywords = questions.key_words;

	if (question >= 1 && question <= 6) return;
  res.render('questions/number', {
		questions : questions,
		question : question,
		statement : statement,
		keywords : keywords,
    user: req.user
	});
});

module.exports = router;
