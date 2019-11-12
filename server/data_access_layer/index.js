const airtable = require('airtable');
const { apiKey, airtableID } = require('../../config');

let base;

module.exports = {
  createBase: () => {
    base = new airtable({ apiKey: apiKey }).base(airtableID);
  },
  base
};
