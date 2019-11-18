/* Extract the actual content of each record. One row could
contain multiple fields, corresponding to multiple columns
*/
function extractContentFromRecords(records) {
  return records.map(record => record.fields);
}

/* Get all the records/rows from the table. An airtable record includes
many different information such as id, fields, other interface functions and so on.
*/
async function getAllFromTable(table) {
  let records = [];
  await table.eachPage((partialRecords, fetchNextPage) => {
    records = [...records, ...partialRecords];
    // continue on the next page of records/rows
    fetchNextPage();
  });
  return records;
}

module.exports = {
  extractContentFromRecords,
  getAllFromTable
};
