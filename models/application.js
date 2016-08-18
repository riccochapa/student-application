var mongoose = require("mongoose");

  var applicationSchema = new mongoose.Schema({
      application: [{
          term: String,
          score: Number,
          questions: [{
            statement: String,
            response: String,
            type: String,
            required: Boolean
          }],
          applicationNotes: {type: String, required: false},
      }],
  });

module.exports = mongoose.model('Application', applicationSchema);
