/* eslint-disable no-console */
const { google } = require('googleapis');

const SHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
const SHEET_RANGE = process.env.SHEETS_RANGE || 'Sheet1!A:B';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

exports.subscribe = async (req, res) => {
  // Basic CORS handling so the React frontend can call this endpoint directly.
  res.set({
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  });

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ result: 'error', error: 'Method not allowed' });
  }

  const email = (req.body && req.body.email ? String(req.body.email) : '').trim();
  if (!email) {
    return res.status(400).json({ result: 'error', error: 'Missing email' });
  }

  if (!SHEET_ID) {
    console.error('Missing SHEETS_SPREADSHEET_ID environment variable');
    return res.status(500).json({ result: 'error', error: 'Server configuration error' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const client = await auth.getClient();

    const sheets = google.sheets({ version: 'v4', auth: client });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), email]],
      },
    });

    return res.status(200).json({ result: 'success' });
  } catch (err) {
    console.error('Failed to append email to sheet', err);
    return res.status(500).json({ result: 'error', error: 'Failed to store email' });
  }
};
