const supertest = require('supertest');
const app = require('../../server/server');
const request = supertest(app);

it('Should return all questions', async done => {
  expect(1).toBe(1);
  const req = await request.get('/api/questions');
  done();
});
