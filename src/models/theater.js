const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
  location: {
    address: {
      city: String,
      state: String,
      street1: String,
      zipcode: String,
    },
    geo: {
      coordinates: [Number],
      type: String,
    },
    theaterId: Number,
  },
})

module.exports = mongoose.model('Theater', theaterSchema)
