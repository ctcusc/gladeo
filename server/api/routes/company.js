const express = require('express')
const router = express.Router()
const { getUserByCompanyCode } = require('../../data_access_layer/company')

router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params
    const user = await getUserByCompanyCode(code)
    if (user == null) {
      throw {
        statusCode: 404,
        message: `No user exists with the company code '${code}'.`
      }
    } else if(user['Email']){
      return res.status(409).send({
        statusCode: 409,
        message: `User with the company code '${code}' has already registered.`
      })
    } else{
      const data = {
        '_record': user['_record'],
        'Company Code': user['Company Code'],
        'Full Name': user['Full Name']
      }
      return res.status(200).send(data)
    }
  } catch (err) {
    if (err.statusCode === undefined) {
      return res.status(404).send({
        statusCode: 404,
        message: `No user exists with the company code '${code}'.`
      })
    }
    return res.status(404).send(err)
  }
})

module.exports = router
