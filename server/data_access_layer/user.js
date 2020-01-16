const { base } = require('./index')
const { extractContentFromRecords, getAllFromTable } = require('./helpers')

async function getUser(userId) {
  const userRecords = base('Users').select({
    filterByFormula: `{ID}='${userId}'`,
    view: 'Grid view'
  })
  // assume there is always one user per userID
  const users = extractContentFromRecords(await getAllFromTable(userRecords))
  return users.length == 0 ? null : users[0]
}

async function getUserByEmail(email) {
  const userRecords = base('Users').select({
    // filterByFormula: `{${EmailFieldName}}='${email}'`,
    filterByFormula: `{Email}='${email}'`,
    view: 'Grid view'
  })
  // assume there is always one user per email
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
  const newUser = {
    'Email': email,
    'Company': [ company ],
    'Current Title': title,
    'Full Name': fullName
  }
  return await base('Users').create(newUser)
}

module.exports = {
  getUser,
  getUserByEmail,
  updateAnsweredQuestions,
  registerUser
}
