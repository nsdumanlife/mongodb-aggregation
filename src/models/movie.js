const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
  cast: [String],
  countries: [String],
  directors: [String],
  fullplot: String,
  genres: [String],
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  languages: [String],
  lastupdated: Date,
  num_mflix_comments: {
    type: Number,
    index: -1,
  },
  plot: String,
  poster: String,
  rated: String,
  released: Date,
  title: String,
  tomatoes: {
    critic: {
      meter: Number,
      numRevies: Number,
      rating: Number,
    },
    viewer: {
      meter: Number,
      numReviews: Number,
      rating: Number,
    },
  },
  type: String,
  writers: [String],
  year: Number,
})

module.exports = mongoose.model('Movie', movieSchema)
