const { base } = require('./index')
const { extractContentFromRecords, getAllFromTable } = require('./helpers')

const userBaseName = 'Users'
const IDFieldName = 'ID'
const EmailFieldName = 'Email'

async function getUser(userId) {
  const userRecords = base(userBaseName).select({
    filterByFormula: `{${IDFieldName}}=${userId}`,
    view: 'Grid view'
  })
  // assume there is always one user per userID
  const users = extractContentFromRecords(await getAllFromTable(userRecords))
  return users.length == 0 ? null : users[0]
}

async function getUserByEmail(email) {
  const userRecords = base(EmailFieldName).select({
    filterByFormula: `{${EmailFieldName}}=${email}`,
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

async function registerUser(fullName, email, title, company) {
  const newUser = [{
    fields: {
      'Email': email,
      'Company': [ company ],
      'Current Title': title,
      'Full Name': fullName
    }
  }]
  await base('Users').update(newUser)
  return newUser
}

module.exports = {
  getUser,
  getUserByEmail,
  updateAnsweredQuestions,
  registerUser
}
