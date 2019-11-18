const airtable = require('airtable');
const { apiKey, airtableID } = require('../../config');

/* Data Access Layer handles the database interactions. It is
separated from the service logic.

The `index.js` creates the Airtable base when it is undefined.
It will only be shared in the DAL*/

let base;

if (base === undefined) {
  base = new airtable({ apiKey: apiKey }).base(airtableID);
}

module.exports = {
  base
};
