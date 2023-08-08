const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  hours: {
    weekdays: {
      type: String,
      required: true
    },
    weekends: {
      type: String,
      required: true
    }
  },
  services: {
    type: [String],
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
