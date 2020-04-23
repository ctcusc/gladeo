const bcrypt = require('bcrypt')
const { base } = require('./index')
const { getCompany } = require('./company')
const nodemailer = require('nodemailer')
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

async function updateEmailandPassword(record, email, password){
  const passwordHashed = bcrypt.hashSync(password, 10)

  const updatedUser = [{
    id: record,
    fields: {
      'Email': email,
      'Password': passwordHashed
    }
  }]

  await base('Users').update(updatedUser)

  const newUser = getUserByEmail(email)
  return newUser
}

async function registerUser(fullName, email, title, companyCode, password) {
  const company = await getCompany(companyCode)
  // Hash password w/ 10 salt rounds
  const passwordHashed = bcrypt.hashSync(password, 10)

  const newUser = {
    'Email': email,
    'Company': company._record,
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

async function sendPasswordResetEmail(email, fullName) {
  // Generate random num between 1000-9999
  const code = Math.floor((Math.random() * 9000) + 1000)

  // Sets up sender details
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gladeo.app@gmail.com',
      pass: 'Abq12Yx34z!8'
    }
  })
  
  // Message contents
  const info = {
    from: '"Gladeo" <gladeo.app@gmail.com>',
    to: email,
    subject: 'Gladeo Password Reset',
    html: '<p>Hello ' + fullName + ',</p><p>There was a request to change your password.<br>Please enter this' 
     + ' 4-digit code into the Gladeo App to continue the password reset process.</p>' + code
  }
  
  // Sends message
  transporter.sendMail(info, function(error,  info) {
    if(error) {
      console.log(error)
    }
  })

  // Updates User record with forgot password code
  const user = await getUserByEmail(email)
  base('Users').update([{
    'id': user['_record'], 
    'fields': {
      'Forgot Password Code': code
    }
  }])
  
}

async function verifyPasswordCode(email, code) {
  const user = await getUserByEmail(email)
  const passwordCode = user['Forgot Password Code']
  if(code == passwordCode) {
    return true
  }
  return false
}

async function updateUserPassword(email, password) {
  const user = await getUserByEmail(email)
  if(user == null) {
    return false
  }
  const passwordHashed = bcrypt.hashSync(password, 10)

  const updatedUser = [{
    id: user._record,
    fields: {
      'Password': passwordHashed
    },
  }]
  base('Users').update(updatedUser)
  return true
}

module.exports = {
  getUser,
  getUserByEmail,
  updateAnsweredQuestions,
  registerUser,
  verifyLogin,
  sendPasswordResetEmail,
  verifyPasswordCode,
  updateUserPassword,
  updateEmailandPassword
}
