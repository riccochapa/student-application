var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
  id: {
    type: String,
    index: {
      unique: true
    }
  },
  question: [{
    number: {
        type: String
    },
    statement: {
        type: String
    },
    response: {
        type: String
    },
    user: {
        type: String
    },
    rating: {
      type: String
    }
  }],
});

module.exports = mongoose.model('Questionaire', questionSchema);
