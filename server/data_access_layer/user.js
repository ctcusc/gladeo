const bcrypt = require('bcrypt')
const { base } = require('./index')
const { getCompany } = require('./company')
const nodemailer = require('nodemailer')
const { extractContentFromRecords, getAllFromTable } = require('./helpers')
const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const youtube = google.youtube('v3')
const OAuth2 = google.auth.OAuth2
const SCOPES = [ 'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube']
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json'

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
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  
  // Message contents
  const info = {
    from: '"Gladeo" <' + process.env.EMAIL + '>',
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


function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR)
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err
    console.log('Token stored to ' + TOKEN_PATH)
  })
}

function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url: ', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close()
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err)
        return
      }
      oauth2Client.credentials = token
      storeToken(token)
      callback(oauth2Client)
    })
  })
}

function authorize(credentials, callback, name, email, URI) {
  const clientSecret = process.env.CLIENT_SECRET
  const clientId = credentials.web.client_id
  const redirectUrl = credentials.web.redirect_uris[0]
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback)
    } else {
      oauth2Client.credentials = JSON.parse(token)
      return(callback(oauth2Client, name, email, URI))
    }
  })
}

async function uploadVideo(auth, name, email, URI) {
  google.options({auth})
  const fileSize = fs.statSync(URI).size
  try {
    const res = await youtube.videos.insert(
      {
        part: 'id,snippet,status',
        notifySubscribers: false,
        requestBody: {
          snippet: {
            title: '[Draft - ready for review] video by ' + name,
            description: 'Draft video created by ' + name + '\nEmail: ' + email,
          },
          status: {
            privacyStatus: 'private',
          },
        },
        media: {
          body: fs.createReadStream(URI),
        },
      },
      
      {
        // Use the `onUploadProgress` event from Axios to track the
        // number of bytes uploaded to this point.
        onUploadProgress: evt => {
          const progress = (evt.bytesRead / fileSize) * 100
          readline.clearLine(process.stdout, 0)
          readline.cursorTo(process.stdout, 0, null)
          process.stdout.write(`${Math.round(progress)}% complete`)
        },
      }
    )
   
    console.log(res.data)
    return res.data

  }catch(err) {
    console.log(err)
  }
  
}


async function videoAuthorize(name, email, URI) {
  name = name
  URI = URI
  email = email
  fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err)
      return
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content), uploadVideo, name, email, URI)
  })
 
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
  updateEmailandPassword,
  uploadVideo,
  authorize,
  getNewToken,
  storeToken,
  videoAuthorize
}
