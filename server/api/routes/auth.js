const express = require('express')
const router = express.Router()
const { getUser, registerUser } = require('../../data_access_layer/user')

// router.get('/login', async (req, res) => {
// })

router.get('/register', async (req, res) => {
  const {Email:email} = req.body
  const fullName = req.body['Full Name'] 
  const title = req.body['Current Title']
  const company = req.body['Company']

  try{
    // check if the user already exists
    const user = await getUser(email)
    // if exists, return error 409
    if (user !== null) {
      throw {
        statusCode: 409,
        message: 'user already exists'
      }
    }
    // else:
    await registerUser(fullName, email, title, company)
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

