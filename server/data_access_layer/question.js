const { base } = require('./index');
const { extractContentFromRecords, getAllFromTable } = require('./helpers');

async function getQuestions() {
  const questionTable = base('Questions').select({
    view: 'Grid view'
  });
  const questions = extractContentFromRecords(
    await getAllFromTable(questionTable)
  );
  return questions;
}

module.exports = {
  getQuestions
};
