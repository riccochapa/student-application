var mongoose = require("mongoose");

  var applicationSchema = new mongoose.Schema({
      id: {type: String, index: {unique: true }},
      term: String,
      score: Number,
      questions: [{
        number: String,
        statement: String,
        response: String,
        responseIf: String,
        type: String,
        required: Boolean
      }],
      applicationNotes: {type: String, required: false},
  });

module.exports = mongoose.model('Application', applicationSchema);