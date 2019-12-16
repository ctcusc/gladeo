const { base } = require('./index')

/* Extract the actual content (`fields: `) of each record. One row could
contain multiple fields, corresponding to multiple columns
*/
function extractContentFromRecords(records) {
  return records.map(record => ({
    ...record.fields
  }))
}

/* Extract the specified keys from the object. For example: `obj = {a:1, b:2, c:3}`. Calling
`getFieldsFromObject(obj, 'b', 'c')` will return `{b:2, c:3}`.
*/
function getFieldsFromObject(obj, ...keys) {
  let filteredObj = {}
  keys.forEach(key => {
    filteredObj[key] = key in obj ? obj[key] : null
  })
  return filteredObj
}

/* Get all the records/rows from the table. An airtable record includes
many different information such as id, fields, other interface functions and so on.
*/
async function getAllFromTable(table) {
  let records = []
  await table.eachPage((partialRecords, fetchNextPage) => {
    records = [...records, ...partialRecords]
    // continue on the next page of records/rows
    fetchNextPage()
  })
  return records
}

/* Clear particular cells of one single record the database*/
async function clearFieldsInSingleRecord(baseName, recordId, ...fieldNames) {
  let fields = {}
  fieldNames.forEach(fieldName => {
    fields[fieldName] = '' 
  })
  try {
    await base(baseName).update([
      {
        id: recordId,
        fields
      }
    ])
  } catch (err) {
    console.log(`Error while clearing fields of record ${recordId}: ${err}`)
    return
  }
}

module.exports = {
  extractContentFromRecords,
  getAllFromTable,
  getFieldsFromObject,
  clearFieldsInSingleRecord
}
