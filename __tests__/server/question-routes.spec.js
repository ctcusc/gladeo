const supertest = require('supertest')
const app = require('../../server/server')
const request = supertest(app)

describe('GET /api/questions', () => {
  it('should print questions in json format when request is successful', async done => {
    const res = await request.get('/api/questions')
    done()
  });
});

describe('GET invalid url', () => {
  it('should return 404 error when invalid url is used', async done => {
    const res = await request.get('/api/invalidurl')
    done()
  });
});

