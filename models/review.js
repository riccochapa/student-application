var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
  id: { type: String },
  studentInfo: [{
      name: { type: String },
      id: { type: String },
      profile: { type: String },
      questionaire: { type: String }
  }],
  score: {
      term: { type: String },
  },
  questions: [{
      number: { type: String },
      rating: { type: String }
  }],
  notes: {
      type: { type: String }
  }
});

module.exports = mongoose.model('Review', reviewSchema);
