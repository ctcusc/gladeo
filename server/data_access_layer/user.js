const { base } = require('./index')
const { extractContentFromRecords, getAllFromTable } = require('./helpers')

const userBaseName = 'Users'
const IDFieldName = 'ID'

async function getUser(userId) {
  const userRecords = base(userBaseName).select({
    filterByFormula: `{${IDFieldName}}=${userId}`,
    view: 'Grid view'
  })
  // assume there is always one user per userID
  const users = extractContentFromRecords(await getAllFromTable(userRecords))
  return users.length == 0 ? null : users[0]
}

async function updateAnsweredQuestions(user, answeredQuestions) {
  user.Answered = answeredQuestions
  
  const updatedUser = [{
    id: user._record,
    fields: {
      'Answered': user.Answered
    },
  }]
  await base('Users').update(updatedUser)
  return user
}

module.exports = {
  getUser,
  updateAnsweredQuestions
}
