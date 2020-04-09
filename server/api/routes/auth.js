const bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router()
const { getUserByEmail, registerUser, verifyLogin, sendPasswordResetEmail, updateEmailandPassword, verifyPasswordCode, updateUserPassword} = require('../../data_access_layer/user')

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
      return res.status(404).send({
        'message': 'A user does not exist with that email',
        'statusCode': 404
      })
    } else {
      // Sends password reset email
      await sendPasswordResetEmail(email, fullName)
      // Currently doesn't send EMAIL because authentication not setup
      return res.status(200).send({
        'message': 'Successfully sent reset password email',
        'statusCode': 200
      })
    }
  } catch(err) {
    return res.status(err.statusCode).send(err)

  }
})

router.post('/confirm-reset-code', async(req, res) => {
  try {
    const email = req.body['Email']
    const code = req.body['Code']
    const success = await verifyPasswordCode(email, code)
    if(success) {
      return res.status(200).send({
        'message': 'Successfully confirmed reset password code',
        'statusCode': 200
      })
    } else {
      return res.status(401).send({
        'success': false,
        'message' : 'Incorrect Password Code'
      })
    }
  } catch(err) {
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

router.post('/reset-password', async(req, res) => {
  try {
    const email = req.body['Email']
    const password = req.body['Password']
    const success = await updateUserPassword(email, password)
    if(success) {
      return res.status(200).send({
        'message': 'Successfully changed password',
        'statusCode': 200
      })
    } else {
      return res.status(404).send({
        'message': 'User not found',
        'statusCode': 404
      })
    }
  }catch(err) {
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

module.exports = router