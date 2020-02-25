const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)

describe('Checks to see if questions route returns the list of questions', () => {
  let res
  beforeAll(async (done) => {
    // Grab questions to use for verification later
    res = await request.get('/api/questions')
    done()
  })
  it('should return successful and return at least 8 questions', () => {
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(8)
  })
  it('should return the first question correctly', () => {
    expect(res.body[0].text).toMatch('Explain what you do in one minute or less')
  })
  it('should return the correct fields', () => {
    for (let i = 0; i < res.body.length; i++) {
      const keys = Object.keys(res.body[i])
      expect(keys[0]).toMatch('_record')
      expect(keys[1]).toMatch('text')
      if(keys[2] == 'Users') {
        expect(keys[3]).toMatch('ID')
      } else {
        expect(keys[2]).toMatch('ID')
      }
    }
  })
})

describe('Checks to see if an invalid route is handled', () => {
  it('should return 404 error when invalid url is used', async (done) => {
    const res = await request.get('/api/invalidurl')
    expect(res.status).toBe(404)
    done()
  })
})
