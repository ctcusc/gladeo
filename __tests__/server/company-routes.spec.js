const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)

describe('Checks to see if company route returns user data successfully with valid company code', () => {
  it('should print user data if successful', async () => {
    const res = await request.get('/api/company/code2')
    expect(res.body['_record']).toBe('recxUAb83anU8A72k')
    expect(res.body['Full Name']).toMatch('test3')
    expect(res.body['Company Code']).toBe('code2')
    expect(res.status).toBe(200)
    // done()
  })
})

describe('Checks to see if valid company code with a registered user is handled', () => {
  it('should return a 409 error', async (done) => {
    const res = await request.get('/api/company/acefh')
    expect(res.status).toBe(409)
    done()
  })
})

describe('Checks to see if invalid company code is handled', () => {
  it('should return a 404 error', async (done) => {
    const res = await request.get('/api/company/1')
    expect(res.status).toBe(404)
    done()
  })
})
