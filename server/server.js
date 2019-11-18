const express = require('express');
const { port, apiKey, airtableID } = require('../config');
const Airtable = require('airtable');
var base = new Airtable({ apiKey: apiKey }).base(airtableID);

async function startServer() {
  const app = express();

  // load routes config
  await require('./api/routes')({ app });

  // load airtable base
  await require('./data_access_layer');

  app.listen(port);
  console.log('App is listening on port ' + port);
}

startServer();
