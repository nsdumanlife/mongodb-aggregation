const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// eslint-disable-next-line prefer-const
let connectionString = process.env.MONGODB_CONNECTION_STRING

mongoose.set('debug', true)

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection established'))
  .catch(error => console.log('not connected:', error))
