var mongoose = require("mongoose");

  var questionSchema = new mongoose.Schema({
      id: {type: String, index: {unique: true }},
      question: [{
        number: {type: String, required: true},
        statement: {type: String, required: true},
        response: {type: String},
        responseIf: {type: String}
      }],
  });

module.exports = mongoose.model('Questionaire', questionSchema);
