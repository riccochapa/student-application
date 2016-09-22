var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
  id: {
    type: String,
    index: { unique: true }
  },
  application: {
    status: {
      type: String
    },
    score: {
      type: Number
    }
  },
  joined: {
    type: Number
  },
  name: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    preferredName: {
      type: String
    }
  },
  demographics: {
    gender: {
      type: String
    },
    age: {
      type: String
    },
    ethnicity: {
      type: String
    }
  },
  contact: {
    phone: {
      type: String
    },
    email: {
      type: String
    },
    address: {
      type: String
    }
  },
  social: {
    github: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    }
  }
});

module.exports = mongoose.model('Profile', profileSchema);
