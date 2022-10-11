require('./database-connection')

const Movie = require('./models/movie')
const Theater = require('./models/theater')

async function main() {
  // console.log(
  //   await Movie.find({ 'imdb.rating': { $gt: 1 } })
  //     .sort('-imdb.rating')
  //     .limit(3)
  // )

  // same as above with aggregation
  const res1 = await Movie.aggregate([
    { $match: { 'imdb.rating': { $gt: 1 } } },
    { $sort: { 'imdb.rating': -1 } },
    { $limit: 3 },
  ])

  // ================================

  // number of theaters by state and sort by descending
  const res2 = await Theater.aggregate([
    // group theaters by state and the theater ids in an array
    { $group: { _id: '$location.address.state', theaters: { $push: '$theaterId' }, numberOfTheaters: { $sum: 1 } } },
    { $sort: { numberOfTheaters: -1 } },
  ])

  // similar to above example. just gives state and number of theaters.
  const res3 = await Theater.aggregate([{ $sortByCount: '$location.address.state' }])

  // =================================
  const res4 = await Theater.aggregate([
    { $group: { _id: '$location.address.state', theaters: { $push: '$theaterId' }, numberOfTheaters: { $sum: 1 } } },
    { $sort: { numberOfTheaters: -1 } },
    {
      $group: {
        _id: 1,
        mostCrowdedState: { $first: '$_id' },
        mostCrowdedCount: { $first: '$numberOfTheaters' },
        leastCrowdedState: { $last: '$_id' },
        leastCrowdedCount: { $last: '$numberOfTheaters' },
      },
    },
    {
      $project: {
        _id: 0,
        mostCrowdedState: {
          name: '$mostCrowdedState',
          numberOfTheaters: '$mostCrowdedCount',
        },
        leastCrowdedState: {
          name: '$leastCrowdedState',
          numberOfTheaters: '$leastCrowdedCount',
        },
      },
    },
  ])

  // ==============================
  // Which day should i release my movie?
  const movies = await Movie.aggregate([
    {
      $group: { _id: { $dayOfWeek: '$released' }, numberOfMovies: { $sum: 1 }, avgRating: { $avg: '$imdb.rating' } },
    },
    { $sort: { avgRating: -1 } },
  ])
  console.log(movies)
}

main()
