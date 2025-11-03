const { google } = require('googleapis');

// IMPORTANT: Replace with your actual Spreadsheet ID
// Get it from: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = process.env.SHEET_NAME || 'Sheet1';
const RANGE = `${SHEET_NAME}!A:C`;

/**
 * HTTP Cloud Function to collect emails and save to Google Sheets
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.collectEmail = async (req, res) => {
  // Set CORS headers for all responses
  // Allow all origins (you can restrict this to specific domains in production)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('📋 Handling CORS preflight request');
    res.status(204).send('');
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.warn(`⚠️ Invalid method: ${req.method}`);
    res.status(405).json({
      result: 'error',
      error: 'Method not allowed. Use POST.'
    });
    return;
  }

  try {
    console.log('📥 Received email submission request');

    // Parse request body
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      console.warn('⚠️ Missing or invalid email in request');
      res.status(400).json({
        result: 'error',
        error: 'Email is required'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`⚠️ Invalid email format: ${email}`);
      res.status(400).json({
        result: 'error',
        error: 'Invalid email format'
      });
      return;
    }

    console.log(`📧 Processing email: ${email}`);

    // Check if SPREADSHEET_ID is configured
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      console.error('❌ SPREADSHEET_ID not configured!');
      res.status(500).json({
        result: 'error',
        error: 'Server configuration error. Please contact administrator.'
      });
      return;
    }

    // Initialize Google Sheets API with Application Default Credentials
    // The service account credentials are automatically available in Cloud Functions
    console.log('🔐 Authenticating with Google Sheets API...');
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data
    const timestamp = new Date().toISOString();
    const source = 'Website';
    const values = [[timestamp, email, source]];

    console.log(`📝 Writing to spreadsheet: ${SPREADSHEET_ID}`);

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    console.log(`✅ Email saved successfully: ${email}`);

    // Success response
    res.status(200).json({
      result: 'success',
      message: 'Email saved successfully'
    });

  } catch (error) {
    console.error('❌ Error saving email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors
    });

    // Check for specific Google API errors
    if (error.code === 403) {
      res.status(500).json({
        result: 'error',
        error: 'Permission denied. Please ensure the service account has access to the spreadsheet.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } else if (error.code === 404) {
      res.status(500).json({
        result: 'error',
        error: 'Spreadsheet not found. Please check the SPREADSHEET_ID.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } else {
      res.status(500).json({
        result: 'error',
        error: 'Failed to save email. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};
