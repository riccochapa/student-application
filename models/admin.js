var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  id: {
    type: String,
    index: { unique: true }
  },
});

module.exports = mongoose.model('Admin', adminSchema);
