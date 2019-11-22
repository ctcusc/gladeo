// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    apiKey: process.env.AIRTABLE_API_KEY,
    airtableID: process.env.AIRTABLE_APP_ID,
    port: process.env.PORT,
    basePath: process.env.BASE_PATH,
    assets: "./assets/fonts/"
};
