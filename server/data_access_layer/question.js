//const { base } = require('./index');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyQKE0pcZQARg9V5' }).base('app3oku6zezqMZDpI');
function getQuestions() {
  var questions = [];
  base('Questions').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 10,
    view: 'Grid view'
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.
    records.forEach(function (record) {
      const question = {
        question: record.get('text'),
        notes: record.get('Notes')
      };
      questions.push(question);
      console.log('Retrieved', question);
    });
    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
  },
    // Callback function
    function done(err) {
      // Failure
      if (err) {
        console.error(err);
        return;
      }
      // SUCCESS
      return questions;
    }
  );
}

module.exports = {
  getQuestions
};
