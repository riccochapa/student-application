var mongoose = require("mongoose");

var applicationSchema = new mongoose.Schema({
    user_id: String,
    term: String,
    score: Number,
    notes: String,
    questions: [Object]
});

module.exports = mongoose.model('Application', applicationSchema);
