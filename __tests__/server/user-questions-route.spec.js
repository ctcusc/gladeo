const supertest = require('supertest')
const app = require('../../server/api/app')
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
    expect(res.body.length).toBe(9)
  })
  it('should return array w/ 5/9 questions answered ', () => {
    // Check getting user's answered questions
    // questions 1,2,3,4, should be answered for user: test2 
    const questions = res.body

    expect(questions[0].Answered).toBe(true)
    expect(questions[1].Answered).toBe(true)
    expect(questions[2].Answered).toBe(true)
    expect(questions[3].Answered).toBe(true)
    expect(questions[4].Answered).toBe(false)
    expect(questions[5].Answered).toBe(false)
    expect(questions[6].Answered).toBe(false)
    expect(questions[7].Answered).toBe(false)
    expect(questions[8].Answered).toBe(false)
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
    expect(res.body.length).toBe(9)
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
  })
}) 

