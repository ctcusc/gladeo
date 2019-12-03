const supertest = require('supertest');
const app = require('../../server/server');
const request = supertest(app);

describe('GET /api/questions', () => {
  it('should print questions in json format when request is successful', async () => {
    const res = await request.get('/api/questions');
    // The current bruteforce way of checking it is to see if there are more than 8 questions returned.
    // TODO: should change the following after we implement the create question function.
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(8);
  });
});

describe('GET invalid url', () => {
  it('should return 404 error when invalid url is used', async () => {
    const res = await request.get('/api/invalidurl');
    expect(res.status).toBe(404);
  });
});

