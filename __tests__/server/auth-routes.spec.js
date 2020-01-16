const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { base } = require('../../server/data_access_layer/index')

// check invalid URL
describe('Checks to see if an invalid route is handled', () => {
  it('should return 404 error when invalid url is used', async() => {
    const res = await request.post('/api/auth/invalidURL').send({
      'Full Name': 'Aliya Petranik',
      'Email': 'petranik@usc.edu',
      'Current Title': 'Tech Lead',
      'Company Code': 'anything', 
    })
    expect(res.status).toBe(404)
  })
})

// check adding a user that already exists
describe('Checks to see if adding a user that already exists is handled', () => {
  it('should return 409 error', async() => {
    const res = await request.post('/api/auth/register').send({
      'Full Name': 'Aliya Petranik',
      'Email': 'petranik@usc.edu',
      'Current Title': 'Tech Lead',
      'Company Code': 'anything', 
    })
    expect(res.status).toBe(409)
  })
}) 

// check successfully adding a user
describe('Checks to see if a new user is created successfully', () => {
  it('should return 200 and successfully create a user', async() => {
    const res = await request.post('/api/auth/register').send({
      'Full Name': 'Yang Qiao',
      'Email': 'xiaoyanq@usc.edu',
      'Current Title': 'Developer',
      'Company Code': '1234', 
    })
    expect(res.status).toBe(200)
    expect(res.body['fields']['Full Name']).toMatch('Yang Qiao')
    expect(res.body['fields']['Email']).toMatch('xiaoyanq@usc.edu')
    await base('Users').destroy(res.body['id'])
  })
})  
