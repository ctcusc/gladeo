const question = require('./routes/question');

// guaranteed to get dependencies
module.exports = app => {
  question(app);
};
