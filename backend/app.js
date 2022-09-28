require('dotenv').config()
const users = require('./routes/users')
const auth = require('./routes/auth')
const cards = require('./routes/cards')
const productRoutes = require('./routes/productRoutes')

const express = require('express')

const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const connectDB = require('./config/db')
connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/cards', cards)
app.use('/api/products', productRoutes)

// RESET PASSWORD

const PORT = process.env.PORT || 3900
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

