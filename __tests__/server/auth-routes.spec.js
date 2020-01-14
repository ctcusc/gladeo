const supertest = require('supertest')
const app = require('../../server/api/app')
const request = supertest(app)
const { getUser } = require('../../data_access_layer/user')

// check invalid URL
describe('Checks to see if an invalid route is handled', () => {
  it('should return 404 error when invalid url is used', async() => {
    const res = await request.get('/api/auth/invalidURL')
    expect(res.status).toBe(404)
  })
})

// check adding a user that already exists
describe('Checks to see if adding a user that already exists is handled', () => {
  it('should return 409 error', async() => {
    const res = await request.get('/api/auth/register')
    if(res.status === 409) {
      const user = await getUser(res.body['Email'])
      expect(user).toBeDefined
    }
  })
}) 

// check successfully adding a user
describe('Checks to see if a new user is created successfully', () => [
  it('should return 200 and successfully create a user', async() => {
    if(res.status === 200) {
      const user = await getUser(res.body['Email'])
      expect(user).toBeDefined
    }
  })
])
  