// === CONFIGURATION ===
// Copy this file to config.local.js and update with your NocoDB credentials
// config.local.js is gitignored for security

const CONFIG = {
    // NocoDB Configuration
    nocodb: {
        baseUrl: 'http://localhost:8080',
        apiToken: '', // Add your API token in config.local.js
        projectId: '', // Add your project ID in config.local.js
    },

    // Table IDs - Update these with your NocoDB table IDs
    tables: {
        companies: '',
        team: '',
        jobs: '',
        reviews: '',
        detailedReviews: '',
        tasksPending: '',
        tasksCompleted: '',
        knowledgeHub: ''
    },

    // App Configuration
    app: {
        itemsPerPage: 5,
        itemsPerListingPage: 3,
        enableMockData: true, // Set to false to use NocoDB only
        debugMode: false // Set to true for console logging
    }
};

// Try to load local config if it exists
if (typeof CONFIG_LOCAL !== 'undefined') {
    Object.assign(CONFIG.nocodb, CONFIG_LOCAL.nocodb || {});
    Object.assign(CONFIG.tables, CONFIG_LOCAL.tables || {});
    Object.assign(CONFIG.app, CONFIG_LOCAL.app || {});
}
