const { base } = require('./index');
const { extractContentFromRecords, getAllFromTable, getFieldsFromObject } = require('./helpers');

const userBaseName = 'Users';
const IDFieldName = 'ID';
const answeredFieldName = 'Answered';

async function getUser(userId) {
  const userRecords = base(userBaseName).select({
    filterByFormula: `{${IDFieldName}}=${userId}`,
    view: 'Grid view'
  });
  // assume there is always one user per userID
  const users = extractContentFromRecords(await getAllFromTable(userRecords));
  return users.length == 0 ? null : users[0];
}

async function updateAnsweredQuestions(userId, answeredQuestions) {
  let fields = {};
  fields[answeredFieldName] = JSON.stringify(answeredQuestions);
  const user = await getUser(userId);
  const obj = [{
    id: user.id,
    fields
  }];
  await base(userBaseName).update([{
    id,
    fields
  }]);
}

module.exports = {
  getUser,
  updateAnsweredQuestions
};
