const express = require('express')
const router = express.Router()
const { getUser, updateAnsweredQuestions } = require('../../data_access_layer/user')

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
    let answeredQuestionIds = user.Answered
    if (answeredQuestionIds === undefined) {
      answeredQuestionIds = []
    }
    return res.status(200).send(answeredQuestionIds)
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.send({
        statusCode: 500,
        message: err.message,
        stack: err.stack
      })
    }
    return res.status(err.statusCode).send(err)
  }
})

router.post('/:id/answer', async (req, res) => {
  try {
    const { id: userId } = req.params
    const { questionId } = req.body
    let answeredQuestionIds = await getUser(userId).Answered
    if (answeredQuestionIds === undefined) {
      answeredQuestionIds = []
    }
    answeredQuestionIds.push(questionId)
    await updateAnsweredQuestions(userId, answeredQuestionIds)
    return res.status(200).send()
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.send({
        statusCode: 500,
        message: err.message,
        stack: err.stack
      })
    }
    return res.status(err.statusCode).send(err)
  }
})

module.exports = router

