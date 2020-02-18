const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const supertestsession = require('supertest-session')

describe('Checks to see if user data is correct', () => {
  let session
  let res
  // get the question ids before the tests
  beforeAll(async (done) => {
    session = await supertestsession(app)
    await session.post('/api/auth/login').send({ Email: 'a@b.com', Password: 'password' })
    res = await session.get('/api/user')

    done()
  })
  
  it('should return successful and have correct user data', async () => {
    expect(res.status).toBe(200)

    expect(res.body['Full Name']).toMatch('test')
    expect(res.body['Email']).toMatch('a@b.com')
    expect(res.body['Current Title']).toMatch('Dev')
  })
  it('should return correct fields, Full Name/Email/Current Title/Answered members if successful', async (done) => {
    const keys = Object.keys(res.body)
    expect(keys[0]).toMatch('_record')
    expect(keys[1]).toMatch('Current Title')
    expect(keys[2]).toMatch('Password')
    expect(keys[3]).toMatch('Full Name')
    expect(keys[4]).toMatch('Company')
    expect(keys[5]).toMatch('Email')
    expect(keys[6]).toMatch('ID')
    if (keys[7])
      expect(keys[7]).toMatch('Answered')
    expect(res.status).toBe(200)
    done()
  })
})

describe('Checks to see if valid url w/ no user authenticated is handled', () => {
  beforeAll(async (done) => {
    session = await supertestsession(app)
    done()
  })
  it('should 404 if no user is logged in', async (done) => {
    const res = await session.get('/api/user')
    expect(res.status).toBe(404)
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
