const bcrypt = require('bcrypt')
const { base } = require('./index')
const { getCompany } = require('./company')
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

async function registerUser(fullName, email, title, companyCode, password) {
  const company = await getCompany(companyCode)

  // Hash password w/ 10 salt rounds
  const passwordHashed = bcrypt.hashSync(password, 10)

  const newUser = {
    'Email': email,
    'Company': [ company._record ],
    'Current Title': title,
    'Full Name': fullName,
    'Password': passwordHashed
  }
  const createdUser = await base('Users').create(newUser)
  return {
    '_record': createdUser.id,
    ...createdUser.fields,
  }
}

async function verifyLogin(email, password) {
  const user = await getUserByEmail(email)
  if(user == undefined) {
    return
  }
  // compare stored hash w/ plaintext
  const match = await bcrypt.compare(password, user.Password)
  if(match) {
    return user
  }
  return
}


module.exports = {
  getUser,
  getUserByEmail,
  updateAnsweredQuestions,
  registerUser,
  verifyLogin
}
