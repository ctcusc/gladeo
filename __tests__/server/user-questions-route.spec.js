const supertest = require('supertest')
const app = require('../../server/api/app')
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')
const request = supertest(app)
const supertestsession = require('supertest-session')

describe('Checks user questions route', () => {
  let session
  let res
  beforeAll(async (done) => {
    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password' })

    res = await session.get('/api/user/questions')
    done()
  })
  it('should return successful w/ an array of the questions', () => {
    // Check getting user's answered questions
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(10)
  })
  it('should return array w/ 5/9 questions answered ', () => {
    // Check getting user's answered questions
    // questions 1,2,3,4, should be answered for user: test2 
    const questions = res.body

    expect(questions[0].Answered).toBe(true)
    expect(questions[1].Answered).toBe(true)
    expect(questions[2].Answered).toBe(true)
    expect(questions[3].Answered).toBe(true)
    expect(questions[4].Answered).toBe(true)
    expect(questions[5].Answered).toBe(false)
    expect(questions[6].Answered).toBe(false)
    expect(questions[7].Answered).toBe(false)
    expect(questions[8].Answered).toBe(false)
    expect(questions[9].Answered).toBe(false)
  })
}) 


describe('Checks user questions route for a new user', () => {
  let session
  let res
  beforeAll(async (done) => {
    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })

    res = await session.get('/api/user/questions')
    done()
  })
  it('should return successful w/ an array of the questions', () => {
    // Check getting user's answered questions
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(10)
  })
  it('should return array w/ 0 questions answered ', () => {
    // Check getting user's answered questions
    // no question should be answered for user: test
    const questions = res.body

    expect(questions[0].Answered).toBe(false)
    expect(questions[1].Answered).toBe(false)
    expect(questions[2].Answered).toBe(false)
    expect(questions[3].Answered).toBe(false)
    expect(questions[4].Answered).toBe(false)
    expect(questions[5].Answered).toBe(false)
    expect(questions[6].Answered).toBe(false)
    expect(questions[7].Answered).toBe(false)
    expect(questions[8].Answered).toBe(false)
    expect(questions[9].Answered).toBe(false)
  })
}) 


describe('Checks updated user is returned when question is answered', () => {
  let session
  let questionIDs
  beforeAll(async () => {
    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })

    const questions = await request.get('/api/questions')
    questionIDs = (questions.body).map(question => question.ID)

  })
  it('should return successful w/ updated user w/ new question in answered field ',  async () => {
    // answer question 7 and then retrieve questions
    await session.post('/api/user/questions').send({ questionId: questionIDs[7] })
    const res = await session.get('/api/user/questions')

    expect(res.status).toBe(200)

    // Confirm the # of answered questions is only 1 and verify it is question #7
    const answered = res.body
    expect(answered.length).toBe(10)
    expect(answered[7].Answered).toBe(true)
  })

  afterEach(async () => {
    const baseName = 'Users'
    const userTestID = 'recmAyOc3FPftHqZG'
    const fieldName = 'Answered'

    await clearFieldsInSingleRecord(baseName, userTestID, fieldName)
  })
}) 

describe('Checks updated user is returned when question is deleted after confirming re-record', () => {
  let session
  let questionIDs
  beforeAll(async () => {
    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })

    const questions = await request.get('/api/questions')
    questionIDs = (questions.body).map(question => question.ID)

  })
  it('should return successful w/ updated user w/ new question deleted in answered field ',  async () => {
    // answer question 7 and then retrieve questions
    await session.post('/api/user/questions').send({ questionId: questionIDs[7] })
    const res = await session.get('/api/user/questions')

    expect(res.status).toBe(200)

    // Confirm the # of answered questions is only 1 and verify it is question #7
    const answered = res.body
    expect(answered.length).toBe(10)
    expect(answered[7].Answered).toBe(true)

    // delete question 7 and then retrieve questions
    await session.delete('/api/user/questions').send({ questionId: questionIDs[7] })
    const res2 = await session.get('/api/user/questions')

    expect(res2.status).toBe(200)

    // Verify question #7 is deleted from user's answered list
    const answered2 = res2.body
    expect(answered2.length).toBe(10)
    expect(answered2[7].Answered).toBe(false)
  })

  afterAll(async () => {
    const baseName = 'Users'
    const userTestID = 'recmAyOc3FPftHqZG'
    const fieldName = 'Answered'

    await clearFieldsInSingleRecord(baseName, userTestID, fieldName)
  })
}) 
