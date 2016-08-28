var mongoose = require("mongoose");

var applicationSchema = new mongoose.Schema({
    id: {
        type: String,
        index: {
            unique: true
        }
    },
    term: String,
    score: Number,
    applicationNotes: {
        type: String
    }
});

module.exports = mongoose.model('Application', applicationSchema);
