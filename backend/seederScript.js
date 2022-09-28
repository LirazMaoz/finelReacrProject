const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const productsData = require('./data/products')
const connectDB = require('./config/db')
const Product = require('./models/product')

connectDB()

const importData = async () => {
  try {
    await Product.insertMany(productsData)
    console.dir('Data Imported Successfuly')

    process.exit()
  } catch (error) {
    console.log(error)
    console.error('Error Ocured In Imported Data Process', error)
    process.exit(1)
  }
}

importData()
