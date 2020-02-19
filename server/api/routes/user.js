const express = require('express')
const router = express.Router()
const { updateAnsweredQuestions } = require('../../data_access_layer/user')
const { getQuestion, getAllQuestions } = require('../../data_access_layer/question')

router.get('/', async (req, res) => {
  if(req.session && req.session.authenticated) { // user logged in
    const user = req.session.authenticated
    return res.status(200).send(user)
  }
  return res.status(404).send({
    message: 'user not logged in',
  })
})

// Returns array of all questions user has answered
router.get('/answered', async (req, res) => {
  try {
    if(req.session && req.session.authenticated) { // user logged in
      const user = req.session.authenticated
      /* 
        User table has foreign key in 'Answered' column that holds reference ID to question table, not primary key
        Use getQuestion() to extract ID and text from Question table given reference ID
      */
      const answeredQuestions = user.Answered
      if (answeredQuestions === undefined) {
        return res.status(200).send([])
      }
      const extractQuestions = () => {
        return Promise.all(answeredQuestions.map(question => getQuestion(question)))
      }
      extractQuestions().then(data => {
        return res.status(200).send(data)
      })
    } else {
      return res.status(403).send({
        message: 'user is not authorized to use this resource',
      })
    }
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.status(500).send({
        statusCode: 500,
        message: err.message,
        stack: err.stack
      })
    }
    return res.status(err.statusCode).send(err)
  }
})

// Return all questions specific to a user
router.get('/questions', async (req, res) => {
  try {
    if(req.session && req.session.authenticated) { // user logged in
      const user = req.session.authenticated
      // get all questions from the questions table
      const allQuestions = await getAllQuestions()

      const userQuestions = []

      allQuestions.map(question => {
        const newQuestion = {
          _record: question._record,
          text: question.text,
          ID: question.ID,
          Answered: false
        }
        // if user answered the question update it's Answered variable
        if(question.Users && question.Users.includes(user._record)) {
          newQuestion.Answered = true
        }
        userQuestions.push(newQuestion)
      })
      
      return res.status(200).send(userQuestions)
      
    } else {
      return res.status(403).send({
        message: 'user is not authorized to use this resource',
      })
    }
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.status(500).send({
        statusCode: 500,
        message: err.message,
        stack: err.stack
      })
    }
    return res.status(err.statusCode).send(err)
  }
})

/* 
  Takes ID of question in body request
  { questionId: 2 }
  Returns the updated User
*/
router.post('/answer', async (req, res) => {
  try {
    if(req.session && req.session.authenticated) { // user logged in
      const user = req.session.authenticated
      const { questionId } = req.body
      let answeredQuestions = [] // ensures array is at least defined if it is empty
      if (user.Answered !== undefined) {
        answeredQuestions = user.Answered // already answered by user
      }

      // Use question's ID to grab the whole object from questions table
      const newQuestion = await getQuestion(questionId)

      // question already answered - don't let dups through
      if (answeredQuestions.includes(newQuestion._record)) {
        return res.status(200).send(user)
      }
      answeredQuestions.push(newQuestion._record)

      // add new question to user's answered list
      const updatedUser = await updateAnsweredQuestions(user, answeredQuestions)

      return res.status(200).send(updatedUser)
    } else {
      return res.status(403).send({
        message: 'user is not authorized to use this resource',
      })
    }
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.status(500).send({
        status: 500,
        message: err.message,
        stack: err.stack
      })
    }
    return res.status(err.statusCode).send(err)
  }
})

module.exports = router

