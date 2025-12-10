# NocoDB Setup Guide

## Step 1: Start NocoDB

If you haven't installed NocoDB yet:

```bash
# Using Docker (recommended)
docker run -d --name nocodb -p 8080:8080 nocodb/nocodb:latest

# OR using npx
npx create-nocodb-app
```

Open: http://localhost:8080

## Step 2: Import Your CSV Files

1. Create a new project or use existing
2. For each CSV file in `tables/` folder:
   - Click "Add Table" → "Import from CSV"
   - Upload the CSV file
   - Verify column types
   - Import

Import these files:
- ✅ Company (Default View).csv
- ✅ Team (Default View).csv
- ✅ Company Rep (Default View).csv
- ✅ Job listings (Default View).csv
- ✅ Job ads (Default View).csv
- ✅ Applications (Default View).csv
- ✅ Tasks (Default View).csv

## Step 3: Get API Token

1. Click your profile icon (top right)
2. Go to "Account Settings"
3. Click "Tokens" tab
4. Click "Create Token"
5. Copy the token (starts with "xc-token-...")

## Step 4: Get Table IDs

For each table you imported:

1. Open the table in NocoDB
2. Look at the URL: `http://localhost:8080/nc/PROJECT_ID/TABLE_ID`
3. Copy the `TABLE_ID` (the last part of the URL)

You need these table IDs:
- Company table ID
- Team table ID
- Job listings table ID

## Step 5: Configure Dashboard

Open `nocodb.js` and update:

```javascript
const NOCODB_CONFIG = {
    baseUrl: 'http://localhost:8080',
    apiToken: 'YOUR_API_TOKEN_HERE',  // Paste your token from Step 3
    projectId: 'YOUR_PROJECT_ID',
};
```

Then find these lines and replace with your table IDs:

```javascript
// Line 38
return await fetchFromNocoDB('TABLE_ID_COMPANY');  // Replace with Company table ID

// Line 44
return await fetchFromNocoDB('TABLE_ID_TEAM');  // Replace with Team table ID

// Line 50
return await fetchFromNocoDB('TABLE_ID_JOBS');  // Replace with Job listings table ID
```

## Step 6: Test the Dashboard

1. Refresh your browser at http://localhost:8000
2. Select a role
3. You should now see your data!

## Troubleshooting

**CORS Error?**
Add to NocoDB environment variables:
```bash
NC_CORS_ORIGIN=http://localhost:8000
```

**No data showing?**
- Check browser console (F12) for errors
- Verify API token is correct
- Verify table IDs are correct
- Make sure NocoDB is running

**Network Error?**
- Check `baseUrl` in nocodb.js
- Make sure NocoDB is accessible at that URL
