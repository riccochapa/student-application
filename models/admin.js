var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
    id: String,
});

module.exports = mongoose.model('Admin', adminSchema);
