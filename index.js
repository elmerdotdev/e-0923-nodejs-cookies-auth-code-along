// Import packages
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

// Routes
app.get('/', (req, res) => {
  res.send('Hello from server')
})

// Start server
const PORT = process.env.BACKEND_PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})