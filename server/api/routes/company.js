const express = require('express')
const router = express.Router()
const { getCompany, getUserByCompanyCode } = require('../../data_access_layer/company')

router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params
    const company = await getUserByCompanyCode(code)
    if (company == null) {
      throw {
        statusCode: 404,
        message: `No user exists with the company code '${code}'.`
      }
    } else if(company['Email']){
      return res.status(200).send(company)
    } else{
      throw {
        statusCode: 409,
        message: `User with the company code '${code}' has already registered.`
      }
    }
  } catch (err) {
    if (err.statusCode === undefined) {
      return res.status(404).send({
        statusCode: 404,
        message: `Company code '${code}' does not exist.`
      })
    }
    return res.status(404).send(err)
  }
})

module.exports = router
