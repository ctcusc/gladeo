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

module.exports = {
  getQuestions
};
