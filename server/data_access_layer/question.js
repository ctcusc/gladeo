const { base } = require('./index')
const { getAllFromTable } = require('./helpers')

async function getQuestions() {
  const questionTable = base('Questions').select({
    view: 'Grid view'
  })

  const questions = extractContentFromRecords(
    await getAllFromTable(questionTable)
  )

  return questions
}

/* Extract the actual content of each record. One row could
contain multiple fields, corresponding to multiple columns
*/
function extractContentFromRecords(records) {
  return records.map(record => ({
    'id': record.fields.ID, 
    'text': record.fields.text
  }))
}

module.exports = {
  getQuestions
}
