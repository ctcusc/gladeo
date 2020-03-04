const express = require('express')
const router = express.Router()
const { getUserByEmail, registerUser, verifyLogin, sendPasswordResetEmail, verifyPasswordCode, updateUserPassword} = require('../../data_access_layer/user')

router.post('/register', async (req, res) => {
  const email = req.body['Email']
  const fullName = req.body['Full Name'] 
  const title = req.body['Current Title']
  const companyCode = req.body['Company Code']
  const password = req.body['Password']

  try {
    // check if the user already exists
    let user = await getUserByEmail(email)
    // if exists, return error 409
    if (user != null) {
      throw {
        statusCode: 409,
        message: 'user already exists'
      }
    }
    // else:
    user = await registerUser(fullName, email, title, companyCode, password)
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

router.get('/confirm-reset-code/:email/:code', async(req, res) => {
  const email = req.params['email']
  const code = req.params['code']
  const success = await verifyPasswordCode(email, code)
  if(success) {
    return res.status(200).send('Success')
  } else {
    return res.status(401).send('Incorrect Password Code')
  }
  return res.status(500)
})

router.post('/reset-password', async(req, res) => {
  const email = req.body['Email']
  const password = req.body['Password']
  const success = await updateUserPassword(email, password)
  if(success) {
    return res.status(200).send('Successfully changed password')
  } else {
    return res.status(404).send('User does not exist')
  }
  return res.status(500)
})

module.exports = router