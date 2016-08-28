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
            questions: questions
        });
    });

});

router.get('/:number', ensureLoggedIn, function(req, res, next) {
    var questionNumber = req.params.number;
    var questions = questionJSON.questions;
    var question = questions[questionNumber - 1];
    var nextQuestion = questions[questionNumber + 1];
    var statement = questions.statement;
    var keywords = questions.key_words;
    var image = questions.image;

    Questionaire.findOne({
        id: req.user.id
    }, function(err, questionaire) {
        if (question >= 1 && question <= 6) return;
        res.render('questionaire/number', {
            user: req.user,
            questions: questions,
            statement: statement,
            question: question,
            keywords: keywords,
            image: image,
            nextQuestion: nextQuestion
        });
    });

});

router.post('/:number', ensureLoggedIn, function(req, res, next) {

    Questionaire.findOne({
        id: req.user.id
    }, function(err, questionaire) {
        var question = new Questionaire({
            id: req.user.id,
            question: [{
                number: req.body.number,
                statement: req.body.statement,
                response: req.body.response,
                responseIf: req.body.responseIf,
            }],
        });
    });

    var question = new Questionaire({
        id: req.user.id,
        question: [{
            number: req.body.number,
            statement: req.body.statement,
            response: req.body.response,
            responseIf: req.body.responseIf,
        }],
    });

    question.save(function(err) {
        if (err) return next(err);
        res.redirect('/questionaire/' + req.body.number);
    });

});

module.exports = router;
