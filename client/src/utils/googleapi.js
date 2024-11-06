const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials = require("../../credentials.json")

// Load the service account credentials
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname,credentials)));

// Create a JWT client
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

async function getSheetData() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1jXdlLQ_emo7gZz4Mjzz8lF30dWuo9h9MvFE7K7LOuRQ',
    range: 'BikesDetails', // Adjust as needed
  });
  return response.data.values;
}

async function appendSheetData(values) {
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: 'YOUR_SHEET_ID',
    range: 'Sheet1!A1', // Adjust as needed
    valueInputOption: 'RAW',
    resource: {
      values: [values],
    },
  });
  return response.data;
}

module.exports = { getSheetData, appendSheetData };
