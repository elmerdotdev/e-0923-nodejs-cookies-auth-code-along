// Import packages
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')

// User in-memory database
const users = {
  "admin": 'admin12345',
  "guest": 'guest12345'
}

// Set up middleware for cookies
app.use(cookieParser(process.env.COOKIE_SECRET_KEY))

// Set up middleware for form submissions
app.use(express.urlencoded({ extended: true }))

// Set view engine to ejs
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
  if (req.cookies.username) {
    const { success } = req.query
    console.log(req.query)
    res.render('home', {
      user: req.cookies.username,
      success: success
    })
  } else {
    res.redirect('/login')
  }
})

// Session cookie - will be deleted when browser is closed
app.get('/session-cookie', (req, res) => {
  res.cookie('temporaryCookie', 'I am a temporary cookie').send('Cookie set!')
})

// Persistent cookie - will be deleted after x amount of time
app.get('/persistent-cookie', (req, res) => {
  res.cookie('foreverCookie', 'I am a persistent cookie', {
    maxAge: 60000 // 60 milliseconds = 60 seconds
  }).send('Cookie set!')
})

// Login route
app.get('/login', (req, res) => {
  res.render('login')
})

// Process login route
app.post('/login/process', (req, res) => {
  const { username, password } = req.body
  if (users[username] && users[username] === password) {
    // User and pw found in database
    res.cookie('username', username, {
      maxAge: 60000 * 60 * 24 // 1 day
    })
    res.redirect('/?success=1')
  } else {
    // Failed login
    res.redirect('/login')
  }
})

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('username')
  res.redirect('/')
})

// Start server
const PORT = process.env.BACKEND_PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})