import { google } from "googleapis";

// ID of the spreadsheet to access
const spreadsheetId = "1jFkyTZKAwtKeoZvcyhxhSeR3sETxKXIAhdjotWE9-ag";

// Set up authentication
const auth = new google.auth.GoogleAuth({
	// Path to the credentials file
	keyFile: "credentials.json",
	// Scopes to request access to
	scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Create client instance for auth
const client = await auth.getClient();

// Create the sheets client
const sheets = google.sheets({ version: "v4", auth: client });

// Get the values in the range A1:A

export const getPromocode = async (date) => {
	try {
		const rows = await sheets.spreadsheets.values.get({
			auth,
			spreadsheetId,
			range: "Промокоды!B2:B32",
		});

		if (!rows || !rows.data || !rows.data.values) {
			throw new Error("Failed to get promocodes");
		}

		const promocodes = rows.data.values.map((item) => item[0]);

		if (!promocodes || promocodes.length === 0) {
			throw new Error("Failed to get promocodes");
		}

		return promocodes[date - 1];
	} catch (error) {
		console.error(error);
		return null;
	}
};
