require('./database-connection')

const Movie = require('./models/movie')

async function main() {
  const movie = await Movie.findOne({})

  console.log(movie)
}

main()
