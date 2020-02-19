const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')
const supertestsession = require('supertest-session')

describe('Checks user answered route for test user 1', () => {
  let session
  let res
  beforeAll(async (done) => {
    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })
    res = await session.get('/api/user/answered')
    done()
  })
  it('should return successfully', () => {
    expect(res.status).toBe(200)
  })

  it('should return empty array of questions', () => {
    // Check to see if # answered questions is zero
    const answeredQuestions = res.body
    expect(answeredQuestions.length).toBe(0)
  })
})

describe('Checks user answered route for test user 2', () => {
  let questionIDs
  let session
  let res
  beforeAll(async (done) => {
    // Grab questions to use for verification later
    const questions = await request.get('/api/questions')
    questionIDs = (questions.body).map(question => question.ID)

    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a2@b.com', Password: 'password' })

    res = await session.get('/api/user/answered')
    done()
  })
  it('should return successfully', () => {
    expect(res.status).toBe(200)
  })

  it('should return empty array of questions', () => {
    // Check to see if # answered questions is zero
    const answeredQuestions = res.body
    expect(answeredQuestions.length).toBe(4)
  })
  it('should return valid questions', () => {
    // Check to see if # answered questions is zero
    const answeredQuestions = res.body
    answeredQuestions.forEach(question => expect(questionIDs.includes(question.ID)).toBe(true))
  })
})


describe('Checks answering new questions', () => {
  let questions
  let session
  let res
  beforeAll(async (done) => {
    // Grab questions to use for verification later
    questions = await request.get('/api/questions')
    const questionIDs = (questions.body).map(question => question.ID)

    // setup session and login
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })

    // Answer a question, a check it see if it's successful
    await session.post('/api/user/answer').send({ questionId: questionIDs[7] })
    res = await session.get('/api/user/answered')
    done()
  })
  
  it('should return successful w/ updated user w/ new question in answered field ', async () => {
    expect(res.status).toBe(200)

    // Confirm the # of answered questions is only 1 and verify it is question #7
    const answered = res.body
    expect(answered.length).toBe(1)
    expect(answered.includes(questions[7]))
  })

  afterAll(async () => {
    const baseName = 'Users'
    const userTestID = 'recmAyOc3FPftHqZG'
    const fieldName = 'Answered'

    await clearFieldsInSingleRecord(baseName, userTestID, fieldName)
  })
})

// describe('Checks answering multiple new questions', () => {
//   let questions
//   let session

//   beforeAll(async (done) => {
    
//     // Grab questions to use for verification later
//     questions = await request.get('/api/questions')
//     const questionIDs = (questions.body).map(question => question.ID)

//     // setup session and login
//     session = await supertestsession(app)
//     user = await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })

//     // Answer 4 questions in succession
//     for (let i = 0; i < 4; ++i) {
//       await session.post('/api/user/answer').send({ questionId: questionIDs[i] })
//     }
//     done()
//   })

//   it('should return updated ids of the answered questions when multiple questions are added sequentially of user test', async (done) => {
//     // Grab users questions and confirm there are multiple new additions
//     const res = await session.get('/api/user/answered')
//     expect(res.status).toBe(200)
//     expect(res.body.length).toBe(4)

//     const answered = res.body
//     answered.forEach((question, index) => {
//       expect(question.ID == questions[index])
//     }, 3000)
//     done()
//   })

//   afterAll(() => {
//     const baseName = 'Users'
//     const userTestID = 'recmAyOc3FPftHqZG'
//     const fieldName = ['Answered']
//     const isArray = true

//     clearFieldsInSingleRecord(baseName, userTestID, fieldName, user)
//   })
// })
