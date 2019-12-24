const express = require('express')
const router = express.Router()
const { getCompany } = require('../../data_access_layer/company')

router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params
    const company = await getCompany(code)
    return res.send(company).status(200)
  } catch (err) {
    if (err.statusCode === undefined) {
      return res.send({
        statusCode: 404,
        message: 'Company code does not exist'
      })
    }
    return res.send(err)
  }
})

module.exports = router
