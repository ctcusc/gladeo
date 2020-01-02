const { base } = require('./index')
const { extractContentFromRecords, getAllFromTable } = require('./helpers')

// Returns ID and Text of all Questions in table 
async function getAllQuestions() {
  const questionTable = base('Questions').select({
    view: 'Grid view',
    fields: ['ID', 'text']
  })
  // get all questions {'ID', 'text', 'Users'}
  const questions = extractContentFromRecords(
    await getAllFromTable(questionTable)
  )
  return questions
}

/*
  Returns question object given EITHER:
  _record (eg: recoRzAZZnYYdEn9K) OR ID (eg: 1,2,3)
*/
async function getQuestion(ID) {
  const questionTable = base('Questions').select({
    filterByFormula: `OR(ID='${ID}', RECORD_ID()='${ID}')`,
    view: 'Grid view'
  })
  
  const questions = extractContentFromRecords(
    await getAllFromTable(questionTable)
  )
  // All reference IDs are unique - only one will ever be returned if it exists
  return questions[0]
}

module.exports = {
  getQuestion,
  getAllQuestions
}
