const supertest = require('supertest');
const app = require('../../server/server');
const request = supertest(app);

describe('Checks user answered route', () => {
  it('should return the nonempty ids of the answered questions when the user id is found and answered questions are not empty', async () => {
    const res = await request.get(`/api/user/${1}/answered`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    console.log(res.body);
  });
});
