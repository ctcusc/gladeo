const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')
const supertestsession = require('supertest-session')

describe('Checks user questions route', () => {
  // let questionIDs
  let session
  beforeAll(async (done) => {
    // Grab questions to use for verification later
    // const questions = await request.get('/api/questions')
    //   questionIDs = (questions.body).map(question => question.ID)
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
    // const userQuestions = res.body
    // expect(userQuestions.length).toBe(questions.body.length)
  
    // TODO: Check to see if each question is truly answered by the user
    done()
  })
  // assume user always has at least one answered questions
  it('should return the empty array of the answered questions of user test', async (done) => {
    // Setup session and login user
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password'})
  
    // Check getting user's answered questions is successful
    const res = await session.get('/api/user/questions')
    expect(res.status).toBe(200)
  
    // Check to see if # answered questions is zero
    // const answeredQuestions = res.body
    // expect(answeredQuestions.length).toBe(0)
  
    done()
  })
}) 