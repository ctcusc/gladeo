const supertest = require('supertest');
const app = require('../../server/server');
const request = supertest(app);
const { clearFieldsInSingleRecord } = require('../../server/data_access_layer/helpers');

const user1Id = 'rectYoq23haJ6lVSv'; // Airtable record id in `user` table
const user1ID = 1; // `ID` field in `user` table
const user2Id = 'recaHw82NAck0EquE';
const user2ID = 2;
const userBaseName = 'Users';

describe('Checks user answered routes', () => {
  const answeredFieldName = 'Answered';
  let questionIds;
  // get the question ids before the tests
  beforeAll(async () => {
    const questionsRes = await request.get('/api/questions')
    expect(questionsRes.status).toBe(200);
    questionIds = questionsRes.body.map(question => question.id);
  });
  // before each test, clear the `answered` field of user2 because the following test might modify them
  beforeEach(async () => {
    clearFieldsInSingleRecord(userBaseName, user2Id, answeredFieldName);
  });
  it('should return status 404 when nonexistent userId is given', async () => {
    const res = await request.get(`/api/user/${-1}/answered`);
    expect(res.status).toBe(404);
  });
  // assume user1 always has at least one answered questions
  it('should return the nonempty ids of the answered questions of user1', async () => {
    const res = await request.get(`/api/user/${user1ID}/answered`);
    expect(res.status).toBe(200);
    const answeredIds = res.body;
    expect(res.body.length).toBeGreaterThan(0);
    // check if each of the recordId is one existing questionId
    answeredIds.forEach(answeredId => expect(questionIds.includes(answeredId)).toBe(true));
  });
  it('should return the empty ids of the answered questions of user2', async () => {
    const res = await request.get(`/api/user/${user2ID}/answered`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });
  it('should return the updated ids of the answered questions when one question is added', async () => {
    let res;
    // make the post update
    res = await request.post(`/api/user/${user2ID}/answer`).send({ questionId: questionIds[0] });
    expect(res.status).toBe(200);
    // check if the update is made correctly
    setTimeout(async () => {
      res = await request.get(`/api/user/${user2ID}/answered`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toBe(questionIds[0]);
    }, (3)); // needs a little time for the change to go through the DB
  });
  it('should return the updated ids of the answered questions when multiple questions are added sequentially', async () => {
    let res;
    // make the post update
    let numOfQuestionsAdded = Math.min(5, questionIds.length);
    for (let i = 0; i < numOfQuestionsAdded; ++i) {
      res = await request.post(`/api/user/${user2ID}/answer`).send({ questionId: questionIds[i] });
      expect(res.status).toBe(200);
    }
    // check if the update is made correctly
    setTimeout(async () => {
      res = await request.get(`/api/user/${user2ID}/answered`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(numOfQuestionsAdded);
      answeredQuestionIds.forEach((questionId, index) => { expect(questionId == questionIds[index]) });
    }, (3)); // needs a little time for the change to go through the DB
  });
  afterAll(async () => {
    clearFieldsInSingleRecord(userBaseName, user2Id, answeredFieldName);
  })
});
