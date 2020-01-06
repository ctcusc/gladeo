const airtable = require('airtable')
const { apiKey, airtableID } = require('../../config')

/* Data Access Layer handles the database interactions. It is
separated from the service logic.
*/
const base = new airtable({ apiKey: apiKey }).base(airtableID)

module.exports = {
  base
}
