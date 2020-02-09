const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')
const supertestsession = require('supertest-session')

describe('Checks user answered route', () => {
  let questionIDs
  let session
  beforeAll(async (done) => {
    // Grab questions to use for verification later
    const questions = await request.get('/api/questions')
    questionIDs = (questions.body).map(question => question.ID)
    done()
  })
  // assume user always has at least one answered questions
  it('should return the nonempty array of the answered questions of user test2', async (done) => {
    // Setup session and login user
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})

    // Check getting user's answered questions is successful
    const res = await session.get('/api/user/answered')
    expect(res.status).toBe(200)

    // Check to see if # answered questions is 4
    const answeredQuestions = res.body
    expect(answeredQuestions.length).toBe(4)

    // check if each of the recordId is one existing questionId
    answeredQuestions.forEach(question => expect(questionIDs.includes(question.ID)).toBe(true))
    done()
  })
  // assume user always has at least one answered questions
  it('should return the empty array of the answered questions of user test', async (done) => {
    // Setup session and login user
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})

    // Check getting user's answered questions is successful
    const res = await session.get('/api/user/answered')
    expect(res.status).toBe(200)

    // Check to see if # answered questions is zero
    const answeredQuestions = res.body
    expect(answeredQuestions.length).toBe(0)

    done()
  })
}) 

describe('Checks user answer route', () => {
  let questions
  let questionIDs
  let session
  // get the question ids before the tests
  beforeAll(async (done) => {
    // setup session and login user
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})

    // Grab questions to use for verification later
    const questionsRes = await request.get('/api/questions')
    questions = questionsRes.body
    questionIDs = questions.map(question => question.ID)
    done()
  })
  it('should return updated user w/ new question in answered field', async (done) => {
    // Answer a question, a check it appears in the user's list of answered questions
    await session.post('/api/user/answer').send({ questionId: questionIDs[7]})
    res = await session.get('/api/user/answered')
    expect(res.status).toBe(200)
    
    // Confirm the # of answered questions is only 1 and verify it is question #7
    const answered = res.body
    expect(answered.length).toBe(1)
    expect(answered.includes(questions[7]))
    done()
  })
  it('should return updated ids of the answered questions when multiple questions are added sequentially of user test', async (done) => {
    // Answer multiple questions in a row
    const numOfQuestionsAdded = Math.min(4, questions.length)
    for (let i = 0; i < numOfQuestionsAdded; ++i) {
      res = await session.post('/api/user/answer').send({ questionId: questionIDs[i]})
      expect(res.status).toBe(200)
    }
    // Grab users questions and confirm there are multiple new additions
    res = await session.get('/api/user/answered')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(numOfQuestionsAdded+1) // extra question added by previous test
    const answered = res.body
    answered.forEach((question, index) => {
      expect(question.ID == questions[index]) 
    }, 3000)
    done()
  })
  afterAll(() => {
    const baseName = 'Users'
    const userTestID = 'recmAyOc3FPftHqZG'
    const fieldName = 'Answered'
    
    clearFieldsInSingleRecord(baseName, userTestID, fieldName)
  })
}) 

describe('Checks to see if user data is correct', () => {
  let session
  // get the question ids before the tests
  beforeAll(async (done) => {
    session = await supertestsession(app)
    done()
  })
  it('should 404 if no user is logged in', async (done) => {
    const res = await session.get('/api/user')
    expect(res.status).toBe(404)
    done()
  })
  it('should print the data of current user if logged in', async (done) => {
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    const res = await session.get('/api/user')
    
    expect(res.body['Full Name']).toMatch('test')
    expect(res.body['Email']).toMatch('a@b.com')
    expect(res.body['Current Title']).toMatch('Dev')
    expect(res.status).toBe(200)
    done()
  })
  it('should return Full Name/Email/Current Title/Answered members if successful', async (done) => {
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    const res = await session.get('/api/user')
    const keys = Object.keys(res.body)
    expect(keys[0]).toMatch('_record')
    expect(keys[1]).toMatch('Current Title')
    expect(keys[2]).toMatch('Password')
    expect(keys[3]).toMatch('Full Name')
    expect(keys[4]).toMatch('Company')
    expect(keys[5]).toMatch('Email')
    expect(keys[6]).toMatch('ID')
    if(keys[7])
      expect(keys[7]).toMatch('Answered')
    expect(res.status).toBe(200)
    done()
  })
})

describe('Checks to see if invalid url is handled', () => {
  it('should return a 404 error', async (done) => {
    const res = await request.get('/api/users')
    expect(res.status).toBe(404)
    done()
  })
})

describe('Checks user questions route', () => {
  let questionIDs
  let session
  beforeAll(async (done) => {
    // Grab questions to use for verification later
    const questions = await request.get('/api/questions')
    questionIDs = (questions.body).map(question => question.ID)
    done()
  })
  // assume user always has at least one answered questions
  it('should return the nonempty array of the answered questions of user test2', async (done) => {
    // Setup session and login user
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})

    // Check getting user's answered questions is successful
    const res = await session.get('/api/user/questions')
    expect(res.status).toBe(200)

    // Check to see if # questions is same as accessed
    const userQuestions = res.body
    expect(userQuestions.length).toBe(questions.body.length)

    // Check if each of the recordId is one existing questionId
    userQuestions.forEach(question => expect(questionIDs.includes(question.ID)).toBe(true))

    // TODO: Check to see if each question is truly answered by the user
    done()
  })
  // assume user always has at least one answered questions
  it('should return the empty array of the answered questions of user test', async (done) => {
    // Setup session and login user
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})

    // Check getting user's answered questions is successful
    const res = await session.get('/api/user/answered')
    expect(res.status).toBe(200)

    // Check to see if # answered questions is zero
    const answeredQuestions = res.body
    expect(answeredQuestions.length).toBe(0)

    done()
  })
}) 
