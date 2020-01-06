const express = require('express')
const questions = require('./routes/question')
const user = require('./routes/user')
const auth = require('./routes/auth')
const company = require('./routes/company')

const app = express()

const bodyParser = require('body-parser')
const session = require('express-session')

// connection checkpoint
app.get('/status', (req, res) => {
  res.status(200).end()
})
app.head('/status', (req, res) => {
  res.status(200).end()
})


// enable Cross Origin Resource Sharing and other options
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// transforms the raw string of req.body into json
app.use(bodyParser.json())

// Tell app where our routes are
app.use('/api/questions', questions)
app.use('/api/user', user)
app.use('/api/company', company)
app.use('/api/auth', auth)

// session config
app.use(
  session({
    secret: 'arandomstring',
    resave: false,
    saveUninitialized: true
  })
)

// general 404 error hendler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err['status'] = 404
  next(err)
})

// general 500 error handler
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message
    }
  })
})


module.exports = app
