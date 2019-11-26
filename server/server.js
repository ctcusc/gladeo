const express = require('express');
const { port, apiKey, airtableID } = require('../config');

const app = express();

async function startServer() {
  // load routes config
  await require('./api/routes')({ app });

  // load airtable base
  await require('./data_access_layer');

  app.listen(port);
  console.log('App is listening on port ' + port);
}

startServer();
module.exports = app;
