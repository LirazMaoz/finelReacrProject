/* require('dotenv').config({ path: '../.env' }) */
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connection SUCCESS')
  } catch (error) {
    console.error('MongoDB connection FAIL')
    process.exit(1)
  }
}

module.exports = connectDB
