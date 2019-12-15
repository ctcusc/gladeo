const question = require('./routes/question');
const user = require('./routes/user');

// guaranteed to get dependencies
module.exports = app => {
  question(app);
  user(app);
};
