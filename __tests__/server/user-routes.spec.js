const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')
const { getUserByEmail } = require('../../server/data_access_layer/user')
const session = require('express-session')
const supertestsession = require('supertest-session')

const user2Id = 'rec2r04V2X5oxB9dd'
const userBaseName = 'Users'

let testSession = null
beforeEach(function () {
  testSession = supertestsession(app)
})

describe('Checks user answered routes', () => {
  const answeredFieldName = 'Answered'
  let questions
  let questionIDs
  // get the question ids before the tests
  beforeAll(async () => {
    const questionsRes = await request.get('/api/questions')
    expect(questionsRes.status).toBe(200)
    questions = questionsRes.body
    questionIDs = questions.map(question => question.ID)
    
  })
  // the following test might modify `answered` field of user test2
  beforeEach(async () => {
    clearFieldsInSingleRecord(userBaseName, user2Id, answeredFieldName)
    await testSession.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})
    const res = await testSession.post('/api/user/answer').send({ questionId: questionIDs[7]})

  })
  // assume user always has at least one answered questions
  it('should return the nonempty array of the answered questions of user test', async () => {
    await testSession.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    const res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    const answeredQuestions = res.body
    expect(res.body.length).toBeGreaterThan(0)
    // check if each of the recordId is one existing questionId
    answeredQuestions.forEach(question => expect(questionIDs.includes(question.ID)).toBe(true))
  })
  it('should return the empty array of the answered questions of user test2', async () => {
    await testSession.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})
    const res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(0)
  })
  afterAll(async () => {
    clearFieldsInSingleRecord(userBaseName, user2Id, answeredFieldName)
  })
}) 

describe('Checks to see if user answers update correctly', () => {
  const answeredFieldName = 'Answered'
  let questions
  let questionIDs
  // get the question ids before the tests
  beforeAll(async () => {
    const questionsRes = await request.get('/api/questions')
    expect(questionsRes.status).toBe(200)
    questions = questionsRes.body
    questionIDs = questions.map(question => question.ID)
    
  })
  // the following test might modify `answered` field of user test2
  beforeEach(async () => {
    clearFieldsInSingleRecord(userBaseName, user2Id, answeredFieldName)
    await testSession.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})
    const res = await testSession.post('/api/user/answer').send({ questionId: questionIDs[7]})
  })/*
  it('should return updated ids of the answered questions when multiple questions are added sequentially', async () => {
    await testSession.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})
    let res
    res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(0)
    const numOfQuestionsAdded = Math.min(4, questions.length)
    for (let i = 0; i < numOfQuestionsAdded; ++i) {
      res = await testSession.post('/api/user/answer').send({ questionId: questionIDs[i]})
      expect(res.status).toBe(200)
    }
    setTimeout(async () => {
      res = await testSession.get('/api/user/answered')
      expect(res.status).toBe(400)
      expect(res.body.length).toBe(numOfQuestionsAdded)
      const answered = res.body.Answered
      answered.forEach((question, index) => {
        expect(question.ID == questions[index], done) 
      })
    }, (3)) // needs a little time for the change go through the DB
  })*/
  it('should return updated user w/ new question in answered field', async () => {
    res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
    const answered = res.body.Answered
    expect(answered.includes(questions[7]))
    done()
  }, (3)) // needs a little time for the change go through the DB
  afterAll(async () => {
    clearFieldsInSingleRecord(userBaseName, user2Id, answeredFieldName)
  })
})

describe('Checks to see if user data is correct', () => {
  it('should 404 if no user is logged in', async () => {
    const res = await testSession.get('/api/user')
    expect(res.status).toBe(404)
  })
  it('should print the data of current user if logged in', async () => {
    await testSession.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    const res = await testSession.get('/api/user')
    
    expect(res.body['Full Name']).toMatch('test')
    expect(res.body['Email']).toMatch('a@b.com')
    expect(res.body['Current Title']).toMatch('Dev')
    expect(res.status).toBe(200)
  })
  it('should return Full Name/Email/Current Title/Answered members if successful', async () => {
    await testSession.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    const res = await testSession.get('/api/user')
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
  })
})

describe('Checks to see if invalid url is handled', () => {
  it('should return a 404 error', async () => {
    const res = await request.get('/api/users')
    expect(res.status).toBe(404)
  })
})
