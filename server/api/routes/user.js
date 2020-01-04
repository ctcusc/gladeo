const express = require('express')
const router = express.Router()
const { getUser, updateAnsweredQuestions } = require('../../data_access_layer/user')
const { getQuestion } = require('../../data_access_layer/question')

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await getUser(id)
    if (user === null) {
      throw {
        statusCode: 404,
        message: `user with ID ${id} not found.`
      }
    }
    return res.status(200).send(user)
  } catch (err) {
    if (err.statusCode === undefined) {
      return res.status(500).send({
        statusCode: 500,
        message: 'User does not exist',
        stack: err.stack
      })
    }
    return res.status(404).send(err)
  }
})
// Returns array of all questions user has answered
router.get('/:id/answered', async (req, res) => {
  try {
    const { id: userId } = req.params
    const user = await getUser(userId)
    if (user === null) {
      throw {
        statusCode: 404,
        message: `user with ID ${userId} not found.`
      }
    }
    /* 
      User table has foreign key in 'Answered' column that holds reference ID to question table, not primary key
      Use getQuestion() to extract ID and text from Question table given reference ID
    */
    let answeredQuestions = user.Answered
    if (answeredQuestions === undefined) {
      return res.status(200).send([])
    }
    let extractQuestions = async => {
      return Promise.all(answeredQuestions.map(question => getQuestion(question)))
    }
    extractQuestions().then(data => {
      return res.status(200).send(data)
    })

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
router.post('/:id/answer', async (req, res) => {
  try {
    const { id: userId } = req.params
    const { questionId } = req.body

    const user = await getUser(userId)
    let answeredQuestions = [] // ensures array is at least defined if it is empty
    if (user.Answered !== undefined) {
      answeredQuestions.concat(user.Answered) // already answered by user
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

