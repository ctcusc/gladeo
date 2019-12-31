const express = require('express')
const router = express.Router()
const { getQuestions } = require('../../data_access_layer/question')

router.get('/', async (req, res) => {
  try {
    const questions = await getQuestions()
    return res.send(questions).status(200)
  } catch (err) {
    // when `statusCode` is not included, it is a server error 500
    if (err.statusCode === undefined) {
      return res.send({
        statusCode: 500,
        message: err.message,
        stack: err.stack
      })
    }
    return res.send(err)
  }
})

module.exports = router

