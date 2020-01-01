const express = require('express')
const router = express.Router()
const { getAllQuestions, getQuestion } = require('../../data_access_layer/question')

// Returns all questions from table - /api/questions/
router.get('/', async (req, res) => {
  try {
    const questions = await getAllQuestions()
    return res.status(200).send(questions)
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

// Returns question given ID (eg: 1,2,3)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const questions = await getQuestion(id)
    if (questions == null) {
      throw {
        statusCode: 404,
        message: `Question with ID: ${id} not found.`
      }
    }    
    return res.status(200).send(questions)
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.status(500).json({
        message: err.message,
        stack: err.stack
      })
    }
    return res.status(err.statusCode).send(err)
  }
})

module.exports = router

