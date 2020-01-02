const express = require('express')
const router = express.Router()
const { getCompany } = require('../../data_access_layer/company')

router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params
    const company = await getCompany(code)
    if (company == null) {
      throw {
        statusCode: 404,
        message: `Company with ID: ${code} not found.`
      }
    } 
    return res.status(200).send(company)
  } catch (err) {
    if (err.statusCode === undefined) {
      return res.status(404).send({
        statusCode: 404,
        message: 'Company code does not exist'
      })
    }
    return res.status(404).send(err)
  }
})

module.exports = router
