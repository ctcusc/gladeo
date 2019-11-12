const { Router } = require('express');
const { getQuestions } = require('../../data_access_layer/question');
const route = Router();

module.exports = app => {
  app.get('/api/questions', async (req, res) => {
    return res.json({ questions: await getQuestions() }).status(200);
  });
};
