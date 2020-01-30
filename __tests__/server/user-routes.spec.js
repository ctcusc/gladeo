const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')
const supertestsession = require('supertest-session')

const user1Id = 'recmAyOc3FPftHqZG'
const userBaseName = 'Users'

let testSession = null

let server
beforeEach(async () => {
  testSession = await supertestsession(app)
})

describe('Checks user already answered routes', () => {
  const answeredFieldName = 'Answered'
  let questions
  let questionIDs
  // get the question ids before the tests
  beforeAll(async (done) => {
    const questionsRes = await request.get('/api/questions')
    expect(questionsRes.status).toBe(200)
    questions = questionsRes.body
    questionIDs = questions.map(question => question.ID)
    done()
  })
  // the following test might modify `answered` field of user test2
  beforeEach(async (done) => {
    await testSession.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password'})
    done()
  })
  // assume user always has at least one answered questions
  it('should return the nonempty array of the answered questions of user test2', async (done) => {
    const res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    const answeredQuestions = res.body
    expect(res.body.length).toBeGreaterThan(0)
    // check if each of the recordId is one existing questionId
    answeredQuestions.forEach(question => expect(questionIDs.includes(question.ID)).toBe(true))
    done()
  })
  afterAll(async (done) => {
    clearFieldsInSingleRecord(userBaseName, user1Id, answeredFieldName)
    done()
  })
}) 

describe('Checks user answer and answered routes', () => {
  const answeredFieldName = 'Answered'
  let questions
  let questionIDs
  // get the question ids before the tests
  beforeAll(async (done) => {
    const questionsRes = await request.get('/api/questions')
    expect(questionsRes.status).toBe(200)
    questions = questionsRes.body
    questionIDs = questions.map(question => question.ID)
    done()
  })
  // the following test might modify `answered` field of user test2
  beforeEach(async (done) => {
    await testSession.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    done()
  })
  it('should return the empty array of the answered questions of user test', async (done) => {
    const res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(0)
    done()
  })
  it('should return updated user w/ new question in answered field', async (done) => {
    await testSession.post('/api/user/answer').send({ questionId: questionIDs[7]})
    res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    const answered = res.body
    expect(answered.length).toBe(1)
    expect(answered.includes(questions[7]))
    done()
  })
  it('should return updated ids of the answered questions when multiple questions are added sequentially of user test', async (done) => {
    const numOfQuestionsAdded = Math.min(4, questions.length)
    for (let i = 0; i < numOfQuestionsAdded; ++i) {
      res = await testSession.post('/api/user/answer').send({ questionId: questionIDs[i]})
      expect(res.status).toBe(200)
    }
    res = await testSession.get('/api/user/answered')
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(numOfQuestionsAdded+1) // extra question added by previous test
    const answered = res.body
    answered.forEach((question, index) => {
      expect(question.ID == questions[index]) 
    }, 3000 )
    done()
  })
  afterAll(() => {
    clearFieldsInSingleRecord(userBaseName, user1Id, answeredFieldName)
  })
}) 

describe('Checks to see if user data is correct', () => {
  it('should 404 if no user is logged in', async (done) => {
    const res = await testSession.get('/api/user')
    expect(res.status).toBe(404)
    done()
  })
  it('should print the data of current user if logged in', async (done) => {
    await testSession.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
    const res = await testSession.get('/api/user')
    
    expect(res.body['Full Name']).toMatch('test')
    expect(res.body['Email']).toMatch('a@b.com')
    expect(res.body['Current Title']).toMatch('Dev')
    expect(res.status).toBe(200)
    done()
  })
  it('should return Full Name/Email/Current Title/Answered members if successful', async (done) => {
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
