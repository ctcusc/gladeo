const { getQuestions } = require('../../data_access_layer/question');

module.exports = app => {
  app.get('/api/questions', async (req, res) => {
    try {
      const questions = await getQuestions();
      return res.send({ questions }).status(200);
    } catch (err) {
      // when `statusCode` is not included, it is a server error 500
      if (err.statusCode === undefined) {
        return res.send({
          statusCode: 500,
          message: err.message,
          stack: err.stack
        });
      }
      return res.send(err);
    }
  });
};
