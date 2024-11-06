const { google } = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

const SPREADSHEET_ID = '1jXdlLQ_emo7gZz4Mjzz8lF30dWuo9h9MvFE7K7LOuRQ';
const SHEET_NAME = 'Sheet1'; // Replace with your sheet name if different

// Initialize Google Sheets API client
async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.SERVICE_ACCOUNT_SECRET),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

// Create (Append) a new row
async function createData(data) {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
    valueInputOption: 'RAW',
    resource: {
      values: [data], // Data should be an array of values for a new row
    },
  });
  console.log('Row added successfully');
}

// Read data from the sheet
async function readData() {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
  });
  const rows = response.data.values;
  if (rows.length) {
    console.log('Data:', rows);
    return rows;
  } else {
    console.log('No data found.');
    return [];
  }
}

// Update a row by index
async function updateData(rowIndex, data) {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A${rowIndex + 1}`, // Assumes data starts at row 1
    valueInputOption: 'RAW',
    resource: {
      values: [data], // New row data
    },
  });
  console.log(`Row ${rowIndex} updated successfully`);
}

// Delete a row (requires reordering data)
async function deleteData(rowIndex) {
  const sheets = await getSheetsClient();

  // Fetch existing data
  const rows = await readData();
  rows.splice(rowIndex, 1); // Remove the specific row

  // Clear and rewrite data
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
    valueInputOption: 'RAW',
    resource: {
      values: rows,
    },
  });
  console.log(`Row ${rowIndex} deleted successfully`);
}

module.exports = { createData, readData, updateData, deleteData };
