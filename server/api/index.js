const question = require('./routes/question')
const company = require('./routes/company')
const user = require('./routes/user')
// guaranteed to get dependencies
module.exports = app => {
  question(app)
  company(app)
  user(app)
}
