const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { base } = require('./index')


// check invalid URL
describe('Checks to see if an invalid route is handled', () => {
  it('should return 404 error when invalid url is used', async done => {
    const res = await request.post('/api/auth/invalidURL').send({
      'Full Name': 'Aliya Petranik',
      'Email': 'petranik@usc.edu',
      'Current Title': 'Tech Lead',
      'Company': '1', 
    })
    expect(res.status).toBe(404)
    done()
  })
})

// check adding a user that already exists
describe('Checks to see if adding a user that already exists is handled', () => {
  it('should return 409 error', async done => {
    const res = await request.post('/api/auth/register').send({
      'Full Name': 'Aliya Petranik',
      'Email': 'petranik@usc.edu',
      'Current Title': 'Tech Lead',
      'Company': '1', 
    })
    expect(res.status).toBe(409)
    done()
  })
}) 

// check successfully adding a user
describe('Checks to see if a new user is created successfully', () => {
  it('should return 200 and successfully create a user', async done => {
    const res = await request.post('api/auth/register').send({
      'Full Name': 'Yang Qiao',
      'Email': 'xiaoyanq@usc.edu',
      'Current Title': 'Developer',
      'Company': '1', 
    })
    expect(res.status).toBe(202)
    expect(res.body['Full Name']).toBeTruthy()
    expect(res.body['Email']).toBeTruthy()
    done()
  })

  afterAll(async() => {
    await base('User').drop()
  })
})  
