const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router() 
const { getUserByEmail, verifyLogin, sendPasswordResetEmail, updateEmailandPassword } = require('../../data_access_layer/user')

router.post('/register', async (req, res) => {
  const email = req.body['Email']
  const password = req.body['Password']
  const record = req.body['_record']
 
  try {
    // update the user info with received password and email
    const data = await updateEmailandPassword(record, email, password)
    // return status 200 and the full record of the user
    return res.status(200).send(data)
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

router.post('/login', async (req, res) => {
  const email = req.body['Email']
  const password = req.body['Password']

  try {
    // Verify username and password is correct
    const user = await verifyLogin(email, password)

    if (user == null) {
      throw {
        statusCode: 404,
        message: 'username or password is incorrect'
      }
    }
    req.session.authenticated = user

    return res.status(200).send(user)
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

router.post('/forgot-password', async(req, res) => {
  const email = req.body['Email']
  const fullName = req.body['Full Name'] 
  try {
    const user = await getUserByEmail(email, fullName)
    // Check to see if email exists in database
    if(user === null) {
      throw {
        message: 'A user does not exist with that email',
        statusCode: 404
      }
    } else {
      // Sends password reset email
      await sendPasswordResetEmail(email, fullName)
      return res.status(200).send('Success')
    }
  } catch(err) {
    return res.status(err.statusCode).send(err)

  }
})

module.exports = router

