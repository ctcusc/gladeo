const { base } = require('./index')
const { extractContentFromRecords, getAllFromTable } = require('./helpers')

async function getCompany(companyCode) {
  const companyTable = base('Company Codes').select({
    // Filter by company Code
    filterByFormula: `Code='${companyCode}'`,
    fields: ['ID', 'Title', 'Code'],
    view: 'Grid view'
  })
  // Gets all fields, '_record, Code, ID, Title'
  const companyData = extractContentFromRecords(
    await getAllFromTable(companyTable)
  )
  // All Codes are unique - only one will ever be returned if it exists
  return companyData[0]
}

module.exports = {
  getCompany
}
