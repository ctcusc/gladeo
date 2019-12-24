const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)

describe('Checks to see if company route returns company data successfully', () => {
  it('should print company data if successful', async () => {
    const res = await request.get('/api/company/1111')
    expect(res.body['ID']).toBe(2)
    expect(res.body['Title']).toMatch('Gladeo')
    expect(res.body['Code']).toBe(1111)
    expect(res.status).toBe(200)
  })
})

describe('Checks to see if ID/Title members exist for returned value', () => {
  it('should print company data if successful', async () => {
    const res = await request.get('/api/company/1111')
    var keys = Object.keys(res.body)
    expect(keys[0]).toMatch('_record')
    expect(keys[1]).toMatch('Code')
    expect(keys[2]).toMatch('ID')
    expect(keys[3]).toMatch('Title')
    expect(res.status).toBe(200)
  })
})

describe('Checks to see if invalid url is handled', () => {
  it('should return a 404 error', async () => {
    const res = await request.get('/api/companycod/1111')
    expect(res.status).toBe(404)
  })
})

describe('Checks to see if invalid company code is handled', () => {
  it('should return a 404 error', async () => {
    const res = await request.get('/api/companycode/1')
    expect(res.status).toBe(404)
  })
})
