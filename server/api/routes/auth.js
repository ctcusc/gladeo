const express = require('express')
const router = express.Router()
const { getUserByEmail, registerUser } = require('../../data_access_layer/user')

// router.get('/login', async (req, res) => {
// })

router.post('/register', async (req, res) => {
  const email = req.body['Email']
  const fullName = req.body['Full Name'] 
  const title = req.body['Current Title']
  const companyCode = req.body['Company Code']

  try{
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
    const company = await getCompany(companyCode)
    user = await registerUser(fullName, email, title, company._record)
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

module.exports = router

