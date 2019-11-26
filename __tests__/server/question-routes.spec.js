const supertest = require('supertest')
const app = require('../../server/server')
const request = supertest(app)

describe('[unit of work]', () => {
  it('should [expected behaviour] when [scenario/context]', async done => {
    const res = await request.get('/api/questions')
    done()
  });
});
