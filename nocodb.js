// === NOCODB CONFIGURATION ===
// Update these values with your NocoDB instance details
const NOCODB_CONFIG = {
    baseUrl: 'http://localhost:8080',  // Your NocoDB URL
    apiToken: 'YOUR_API_TOKEN_HERE',   // Your API token
    projectId: 'YOUR_PROJECT_ID',      // Your project ID
};

// === HELPER FUNCTION: Fetch data from NocoDB ===
async function fetchFromNocoDB(tableName, filters = {}) {
    const url = `${NOCODB_CONFIG.baseUrl}/api/v2/tables/${tableName}/records`;

    try {
        const response = await fetch(url, {
            headers: {
                'xc-token': NOCODB_CONFIG.apiToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.list || data.data || [];
    } catch (error) {
        console.error(`Error fetching from ${tableName}:`, error);
        return [];
    }
}

// === TABLE-SPECIFIC QUERY FUNCTIONS ===

// Get all companies (customers)
async function getCustomers() {
    // Replace 'TABLE_ID_COMPANY' with your actual Company table ID from NocoDB
    return await fetchFromNocoDB('TABLE_ID_COMPANY');
}

// Get team members
async function getTeamMembers() {
    // Replace 'TABLE_ID_TEAM' with your actual Team table ID from NocoDB
    return await fetchFromNocoDB('TABLE_ID_TEAM');
}

// Get job listings
async function getJobListings(status = null) {
    // Replace 'TABLE_ID_JOBS' with your actual Job listings table ID from NocoDB
    const jobs = await fetchFromNocoDB('TABLE_ID_JOBS');

    // Filter by status if provided
    if (status && status !== 'all') {
        return jobs.filter(job =>
            job.Status && job.Status.toLowerCase() === status.toLowerCase()
        );
    }

    return jobs;
}

// === EXAMPLE: Using Views (recommended for complex queries) ===
// NocoDB allows you to create "Views" with pre-configured filters
// This is more efficient than filtering in JavaScript

async function fetchView(viewId) {
    const url = `${NOCODB_CONFIG.baseUrl}/api/v2/tables/${viewId}/records`;

    try {
        const response = await fetch(url, {
            headers: {
                'xc-token': NOCODB_CONFIG.apiToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.list || data.data || [];
    } catch (error) {
        console.error('Error fetching view:', error);
        return [];
    }
}
