var mongoose = require("mongoose");

  var applicantSchema = new mongoose.Schema({
    applicant: [{
      applicantId: {type: String, required: true},
      applicantProfile: [{
        name: [{
          firstName: {type: String, required: true},
          lastName: {type: String, required: true},
          preferredName: {type: String, required: false},
          userName: {type: String, required: true}
        }],
        stats: [{
          gender: {type: String, required: true},
          age: {type: String, required: true},
          ethnicity: {type: String, required: true},
        }],
        contactInfo: [{
          phone: {type: Number, required: true},
          email: {type: String, required: true},
          address: {type: String, required: true},
        }],
        socialMedia: [{
          Github: {type: String, required: false},
          Facebook: {type: String, required: false},
          Twitter: {type: String, required: false},
        }],
        avatar: [{
          photo: {String, required: false},
        }],
      }],
      application: [{
          questionOne: [{
            responseOne: {type: String, required: true},
            responseIfOne: {type: String, required: false},
          }],
          questionTwo: [{
            responseTwo: {type: String, required: true},
            responseIfTwo: {type: String, required: false},
          }],
          questionThree: [{
            responseThree: {type: String, required: true},
            responseIfThree: {type: String, required: false},
          }],
      }],
      applicationScore: {type: String, required: false},
      applicationNotes: {type: String, required: false},
    }],
  });

  module.exports = mongoose.model('Applicant', applicantSchema);
