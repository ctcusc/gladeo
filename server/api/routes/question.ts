const { Router } = require('express');
const { getQuestions } = require('../../data_access_layer/question');

export default (app: Router) => {
  app.get('/questions', async (req, res) => {
    return await getQuestions();
  });
};
