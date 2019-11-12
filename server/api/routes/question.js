const { Router } = require('express');
const { getQuestions } = require('../../data_access_layer/question');
const route = Router();

module.exports = app => {
  app.get('/api/questions', (req, res) => {
    const questions = getQuestions();
    return res.send({ questions }).status(200);
  });
};
