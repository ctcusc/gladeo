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

async function getUserByCompanyCode(companyCode) {
  const userRecords = base('Users').select({
    filterByFormula: `{Company Code}='${companyCode}'`,
    view: 'Grid view'
  })
  // assume there is always one user per companyCode
  const users = extractContentFromRecords(await getAllFromTable(userRecords))
  return users.length == 0 ? null : users[0]
}

module.exports = {
  getCompany,
  getUserByCompanyCode
}
