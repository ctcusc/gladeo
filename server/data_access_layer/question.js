const { base } = require('./index');
const { extractContentFromRecords, getAllFromTable, getFieldsFromObject } = require('./helpers');

async function getQuestions() {
  const questionTable = base('Questions').select({
    view: 'Grid view'
  });

  const questions = extractContentFromRecords(
    await getAllFromTable(questionTable)
  );

  questions.forEach((question, index, questions) => {
    questions[index] = getFieldsFromObject(question, 'id', 'text');
  });
  return questions;
}

async function getAnsweredQuestionIds(userId) {
  const userRecords = base('Users').select({
    filterByFormula: `{ID}=${userId}`,
    view: 'Grid view'
  });

  // assume there is always one user per userID
  const user = extractContentFromRecords(await getAllFromTable(userRecords))[0];

  return user.Answered;
}

module.exports = {
  getQuestions,
  getAnsweredQuestionIds
};
