const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { base } = require('../../server/data_access_layer/index')
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers')

// check invalid URL
describe('Checks to see if an invalid route is handled', () => {
  it('should return 404 error when invalid url is used', async(done) => {
    const res = await request.post('/api/auth/invalidURL').send({
      'Email': 'a2@b.com',
      'Password': '1234567899998',
      '_record': 'rec2r04V2X5oxB9dd',
    })
    expect(res.status).toBe(404)
    done()
  })
})

// check successfully updating a user
describe('Checks to see if a new user is created successfully', () => {
  it('should return 200 and successfully create a user', async(done) => {
    const res = await request.post('/api/auth/register').send({
      '_record': 'recxUAb83anU8A72k',
      'Email': 'abc@usc.edu',
      'Password': 'abc12345'
    })
    expect(res.status).toBe(200)
    expect(res.body['Email']).toMatch('abc@usc.edu')
    expect(res.body['_record']).toMatch('recxUAb83anU8A72k')
    
    const baseName = 'Users'
    const userTestID = 'recxUAb83anU8A72k'

    await clearFieldsInSingleRecord(baseName, userTestID, 'Email')
    await clearFieldsInSingleRecord(baseName, userTestID, 'Password')
    done()
  })
})  
