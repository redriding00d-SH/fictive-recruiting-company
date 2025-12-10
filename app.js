// === UI UTILITIES ===
const UI = {
    showLoading(tableId) {
        const tbody = document.getElementById(tableId);
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: #808080; padding: 2rem;"><div class="spinner"></div> Loading data...</td></tr>';
        }
    },

    showError(tableId, message = 'Failed to load data') {
        const tbody = document.getElementById(tableId);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #ff6b6b; padding: 2rem;">⚠️ ${message}<br><button class="retry-btn" onclick="location.reload()">Retry</button></td></tr>`;
        }
    },

    showEmpty(tableId, message = 'No data found') {
        const tbody = document.getElementById(tableId);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #808080; padding: 2rem;">${message}</td></tr>`;
        }
    },

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    validateRequired(value, fieldName) {
        if (!value || value.trim() === '') {
            throw new Error(`${fieldName} is required`);
        }
        return true;
    },

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// === VIEW STATE ===
const viewState = {
    customers: { expanded: false, allData: [], loading: false },
    team: { expanded: false, allData: [], loading: false },
    submitted: { expanded: false, allData: [], loading: false },
    review: { expanded: false, allData: [], loading: false },
    approved: { expanded: false, allData: [], loading: false },
    pending: { expanded: false, allData: [], loading: false },
    completed: { expanded: false, allData: [], loading: false },
    currentView: 'home'
};

// === SWITCH VIEW ===
function switchView(viewName) {
    // Update view state
    viewState.currentView = viewName;

    // Hide all views
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
    });

    // Show selected view
    document.getElementById(`view-${viewName}`).classList.add('active');

    // Update nav icons
    document.querySelectorAll('.nav-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    document.querySelector(`.nav-icon[data-view="${viewName}"]`).classList.add('active');

    // Load data for specific views
    if (viewName === 'listings') {
        renderAllJobsView();
    } else if (viewName === 'customers') {
        renderReviews();
        renderDetailedReviews();
    } else if (viewName === 'library') {
        renderKnowledgeHub();
    } else if (viewName === 'checklist') {
        renderTasks();
    }
}


// === TOGGLE VIEW (See all / Show less) ===
function toggleView(section) {
    viewState[section].expanded = !viewState[section].expanded;
    const btn = document.getElementById(`${section}-see-all`);
    btn.textContent = viewState[section].expanded ? 'Show less' : 'See all';

    // Re-render the section
    if (section === 'customers') renderCustomers();
    if (section === 'team') renderTeam();
}

// === TOGGLE LISTING VIEW (View all / Show less) ===
function toggleListingView(section) {
    viewState[section].expanded = !viewState[section].expanded;
    const btn = document.getElementById(`${section}-see-all`);
    btn.textContent = viewState[section].expanded ? 'Show less' : 'View all';

    // Re-render the listings view
    renderAllJobsView();
}

// === TOGGLE TASK VIEW (View all / Show less) ===
function toggleTaskView(section) {
    viewState[section].expanded = !viewState[section].expanded;
    const btn = document.getElementById(`${section}-tasks-see-all`);
    btn.textContent = viewState[section].expanded ? 'Show less' : 'View all';

    // Re-render the tasks view
    renderTasks();
}

// === LOGOUT FUNCTION ===
function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// === DISPLAY USER ROLE ===
function displayUserRole() {
    const role = localStorage.getItem('userRole');
    if (!role) {
        window.location.href = 'index.html';
        return;
    }

    const roleNames = {
        'account-manager': 'Account Manager',
        'marketer': 'Marketer',
        'recruiter': 'Recruiter'
    };

    const roleName = roleNames[role] || 'User';
    document.getElementById('user-role-display').textContent = roleName;
    document.getElementById('profile-role').textContent = roleName;

    // Update avatar letter
    document.querySelector('.avatar').textContent = roleName.charAt(0);

    // Mark current role in dropdown
    document.querySelectorAll('.role-option').forEach(option => {
        if (option.getAttribute('data-role') === role) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Apply role-based visibility
    applyRoleBasedVisibility(role);
}

// === APPLY ROLE-BASED VISIBILITY ===
function applyRoleBasedVisibility(role) {
    // Hide/show navigation tabs based on role
    const customersTab = document.querySelector('.nav-icon[data-view="customers"]');
    const libraryTab = document.querySelector('.nav-icon[data-view="library"]');
    const customerOverview = document.querySelector('.customer-overview');

    if (role === 'marketer') {
        // Marketers don't need Customers tab
        if (customersTab) customersTab.style.display = 'none';
        // Hide Customer Overview from home
        if (customerOverview) customerOverview.style.display = 'none';
    } else if (role === 'recruiter') {
        // Recruiters don't need Library tab
        if (libraryTab) libraryTab.style.display = 'none';
    } else {
        // Account Manager sees everything
        if (customersTab) customersTab.style.display = 'flex';
        if (libraryTab) libraryTab.style.display = 'flex';
        if (customerOverview) customerOverview.style.display = 'block';
    }
}

// === DROPDOWN TOGGLE ===
function setupDropdown() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const roleMenu = document.getElementById('role-menu');

    // Toggle dropdown
    profileDropdown.addEventListener('click', (e) => {
        // Don't close if clicking inside the dropdown menu
        if (!e.target.closest('.role-option')) {
            profileDropdown.classList.toggle('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    // Handle role selection
    document.querySelectorAll('.role-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const newRole = option.getAttribute('data-role');

            // Update role in localStorage
            localStorage.setItem('userRole', newRole);

            // Close dropdown
            profileDropdown.classList.remove('active');

            // Reload page to show new role
            window.location.reload();
        });
    });
}

// === RENDER CUSTOMER DATA ===
async function renderCustomers() {
    const tableId = 'customer-table';
    const tableBody = document.getElementById(tableId);

    try {
        UI.showLoading(tableId);
        viewState.customers.loading = true;

        // Use mock data if available, otherwise fetch from NocoDB
        const allCustomers = typeof mockData !== 'undefined' ? mockData.companies : await getCustomers();
        viewState.customers.allData = allCustomers;
        viewState.customers.loading = false;

        if (allCustomers.length === 0) {
            UI.showEmpty(tableId, 'No customers found');
            return;
        }

        // Show only 5 items unless expanded
        const customers = viewState.customers.expanded ? allCustomers : allCustomers.slice(0, 5);

        // Hide "See all" button if 5 or fewer items
        const btn = document.getElementById('customers-see-all');
        if (btn) btn.style.display = allCustomers.length <= 5 ? 'none' : 'block';

        tableBody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.Firmenname || 'N/A'}</td>
                <td>${customer.Submitted || 'N/A'}</td>
                <td>${customer.Quota || 'N/A'}</td>
                <td>${calculateFulfilled(customer.Quota) || 'N/A'}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error rendering customers:', error);
        viewState.customers.loading = false;
        UI.showError(tableId, 'Unable to load customers. Please check your connection.');
    }
}

// Helper function to calculate fulfillment percentage
function calculateFulfilled(quota) {
    if (!quota) return 'N/A';
    // If quota is in format "3/10", calculate percentage
    const parts = quota.toString().split('/');
    if (parts.length === 2) {
        const filled = parseInt(parts[0]);
        const total = parseInt(parts[1]);
        if (!isNaN(filled) && !isNaN(total) && total > 0) {
            return Math.round((filled / total) * 100) + '%';
        }
    }
    return 'N/A';
}

// === RENDER TEAM DATA ===
async function renderTeam() {
    const teamTable = document.getElementById('team-table');

    // Use mock data if available, otherwise fetch from NocoDB
    const allMembers = typeof mockData !== 'undefined' ? mockData.team : await getTeamMembers();
    viewState.team.allData = allMembers;

    if (allMembers.length === 0) {
        teamTable.innerHTML = '<tr><td colspan="6">No team members found</td></tr>';
        return;
    }

    // Show only 5 items unless expanded
    const members = viewState.team.expanded ? allMembers : allMembers.slice(0, 5);

    // Hide "See all" button if 5 or fewer items
    const btn = document.getElementById('team-see-all');
    btn.style.display = allMembers.length <= 5 ? 'none' : 'block';

    teamTable.innerHTML = members.map(member => {
        const firstName = member['First name'] || member.FirstName || '';
        const lastName = member['Last name'] || member.LastName || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'N/A';
        const role = member.Roles || member.Role || 'N/A';
        const email = member.Email || 'N/A';
        const vacationDays = member['Vacation Days'] || 0;
        const workdays = member.Workdays || 0;
        const status = member.Status || 'N/A';

        // Status badge styling
        const statusClass = status.toLowerCase() === 'active' ? 'status-active' : 'status-leave';

        return `
            <tr>
                <td><strong>${fullName}</strong></td>
                <td>${role}</td>
                <td>${email}</td>
                <td>${vacationDays}</td>
                <td>${workdays}</td>
                <td><span class="team-status ${statusClass}">${status}</span></td>
            </tr>
        `;
    }).join('');
}

// === RENDER JOB OVERVIEW (5 items) ===
async function renderJobsOverview() {
    const tableBody = document.getElementById('jobs-overview-table');
    const allJobs = typeof mockData !== 'undefined' ? mockData.jobs : await getJobListings();

    if (allJobs.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">No jobs found</td></tr>';
        return;
    }

    // Show only first 5 jobs
    const jobs = allJobs.slice(0, 5);

    tableBody.innerHTML = jobs.map(job => {
        const jobTitle = job['Job title'] || job.JobTitle || 'N/A';
        const jobStatus = job.Status || 'N/A';
        const published = job.Published || 'N/A';

        return `
            <tr>
                <td><strong>${jobTitle}</strong></td>
                <td>
                    <span class="status-badge ${jobStatus.toLowerCase()}">
                        ${jobStatus}
                    </span>
                </td>
                <td>${published}</td>
            </tr>
        `;
    }).join('');
}

// === RENDER ALL JOBS VIEW (3 TABLES BY STATUS) ===
async function renderAllJobsView() {
    // Use mock data if available, otherwise fetch from NocoDB
    const allJobs = typeof mockData !== 'undefined' ? mockData.jobs : await getJobListings();

    // Separate jobs by status
    const submittedJobs = allJobs.filter(job => job.Status && job.Status.toLowerCase() === 'submitted');
    const reviewJobs = allJobs.filter(job => job.Status && job.Status.toLowerCase() === 'review');
    const approvedJobs = allJobs.filter(job => job.Status && job.Status.toLowerCase() === 'approved');

    // Store all data
    viewState.submitted.allData = submittedJobs;
    viewState.review.allData = reviewJobs;
    viewState.approved.allData = approvedJobs;

    // Show only 3 items unless expanded
    const submittedToShow = viewState.submitted.expanded ? submittedJobs : submittedJobs.slice(0, 3);
    const reviewToShow = viewState.review.expanded ? reviewJobs : reviewJobs.slice(0, 3);
    const approvedToShow = viewState.approved.expanded ? approvedJobs : approvedJobs.slice(0, 3);

    // Hide "View all" button if 3 or fewer items
    const submittedBtn = document.getElementById('submitted-see-all');
    const reviewBtn = document.getElementById('review-see-all');
    const approvedBtn = document.getElementById('approved-see-all');
    if (submittedBtn) submittedBtn.style.display = submittedJobs.length <= 3 ? 'none' : 'inline-block';
    if (reviewBtn) reviewBtn.style.display = reviewJobs.length <= 3 ? 'none' : 'inline-block';
    if (approvedBtn) approvedBtn.style.display = approvedJobs.length <= 3 ? 'none' : 'inline-block';

    // Render each table
    renderSubmittedJobsTable('submitted-jobs-table', submittedToShow);
    renderJobListingTable('review-jobs-table', reviewToShow, 'review');
    renderJobListingTable('approved-jobs-table', approvedToShow, 'approved');
}

// === HELPER: RENDER SUBMITTED JOBS TABLE WITH ASSIGN BUTTONS ===
function renderSubmittedJobsTable(tableId, jobs) {
    const tableBody = document.getElementById(tableId);

    if (jobs.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #808080;">No submitted jobs</td></tr>';
        return;
    }

    // Get team members for assignment
    const teamMembers = typeof mockData !== 'undefined' ? mockData.team : [];

    // Define task types
    const taskTypes = [
        'Candidate Sourcing',
        'Interview Coordination',
        'Offer Preparation'
    ];

    tableBody.innerHTML = jobs.map((job, index) => {
        const jobTitle = job['Job title'] || job.JobTitle || 'N/A';
        const submitted = job.Submitted || 'N/A';
        const company = job.Company || 'N/A';
        const currentAssigned = job.Assigned || '';
        const currentTask = job.Task || '';

        // Create assignment dropdown
        const assignmentOptions = teamMembers.map(member => {
            const firstName = member['First name'] || member.FirstName || '';
            const lastName = member['Last name'] || member.LastName || '';
            const fullName = `${firstName} ${lastName}`.trim();
            const selected = fullName === currentAssigned ? 'selected' : '';
            return `<option value="${fullName}" ${selected}>${fullName}</option>`;
        }).join('');

        // Create task dropdown
        const taskOptions = taskTypes.map(task => {
            const selected = task === currentTask ? 'selected' : '';
            return `<option value="${task}" ${selected}>${task}</option>`;
        }).join('');

        return `
            <tr data-job-index="${index}">
                <td>${submitted}</td>
                <td><strong>${jobTitle}</strong></td>
                <td>
                    <select class="assign-dropdown" onchange="assignJob(${index}, this.value)">
                        <option value="">Select team member</option>
                        ${assignmentOptions}
                    </select>
                </td>
                <td>
                    <select class="assign-dropdown" onchange="assignTask(${index}, this.value)">
                        <option value="">Select task type</option>
                        ${taskOptions}
                    </select>
                </td>
                <td>${company}</td>
                <td>
                    <button class="action-btn create-task-btn" onclick="createTask(${index})">Create task</button>
                </td>
            </tr>
        `;
    }).join('');
}

// === ASSIGN JOB TO TEAM MEMBER ===
function assignJob(jobIndex, assignedTo) {
    const submittedJobs = viewState.submitted.allData;
    if (submittedJobs[jobIndex]) {
        submittedJobs[jobIndex].Assigned = assignedTo;
    }
}

// === ASSIGN TASK TYPE TO JOB ===
function assignTask(jobIndex, taskType) {
    const submittedJobs = viewState.submitted.allData;
    if (submittedJobs[jobIndex]) {
        submittedJobs[jobIndex].Task = taskType;
    }
}

// === CREATE TASK ===
function createTask(jobIndex) {
    try {
        const submittedJobs = viewState.submitted.allData;
        const job = submittedJobs[jobIndex];

        if (!job) {
            throw new Error('Job not found');
        }

        // Validation
        UI.validateRequired(job.Assigned, 'Team member');
        UI.validateRequired(job.Task, 'Task type');
        UI.validateRequired(job.Company, 'Company name');

        const assignedTo = job.Assigned;
        const taskType = job.Task;
        const jobTitle = job['Job title'] || 'Untitled Job';

        UI.showToast(`Task created for ${jobTitle} - Assigned to ${assignedTo}`, 'success');

    } catch (error) {
        console.error('Error creating task:', error);
        UI.showToast(error.message || 'Failed to create task', 'error');
    }
}

// === HELPER: RENDER JOB LISTING TABLE ===
function renderJobListingTable(tableId, jobs, type) {
    const tableBody = document.getElementById(tableId);

    if (jobs.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #808080;">No jobs in this category</td></tr>';
        return;
    }

    tableBody.innerHTML = jobs.map(job => {
        const jobTitle = job['Job title'] || job.JobTitle || 'N/A';
        const location = job.Location || 'N/A';
        const slots = job.Slots || 'N/A';
        const assigned = job.Assigned || 'N/A';
        const submitted = job.Submitted || 'N/A';
        const deadline = job.Deadline || '-';
        const launchDate = job.LaunchDate || '-';

        const dateColumn = type === 'review' ? deadline : launchDate;

        return `
            <tr>
                <td>${submitted}</td>
                <td><strong>${jobTitle}</strong></td>
                <td>${location}</td>
                <td>${slots}</td>
                <td>${assigned}</td>
                <td>${dateColumn}</td>
                <td><span class="edit-icon">✏️</span></td>
            </tr>
        `;
    }).join('');
}

// === RENDER REVIEWS FROM CUSTOMERS ===
async function renderReviews() {
    const tableBody = document.getElementById('reviews-table');
    const reviews = typeof mockData !== 'undefined' ? mockData.reviews : [];

    if (reviews.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #808080;">No reviews found</td></tr>';
        return;
    }

    tableBody.innerHTML = reviews.map(review => {
        const stars = '⭐'.repeat(review.Rating);

        return `
            <tr>
                <td><strong>${review.Company}</strong></td>
                <td>${stars}</td>
                <td>${review.JobRef}</td>
                <td>${review.Qualified}</td>
                <td>${review.Unqualified}</td>
                <td>${review.Submitted}</td>
            </tr>
        `;
    }).join('');
}

// === RENDER DETAILED REVIEWS FROM CUSTOMERS ===
async function renderDetailedReviews() {
    const tableBody = document.getElementById('detailed-reviews-table');
    const detailedReviews = typeof mockData !== 'undefined' ? mockData.detailedReviews : [];

    if (detailedReviews.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #808080;">No detailed reviews found</td></tr>';
        return;
    }

    tableBody.innerHTML = detailedReviews.map(review => {
        const stars = '⭐'.repeat(review.Rating);

        return `
            <tr>
                <td><strong>${review.Company}</strong></td>
                <td>${review.Representative}</td>
                <td>${review.Position}</td>
                <td>${review.Date}</td>
                <td>${stars}</td>
                <td class="review-text">${review.Review}</td>
            </tr>
        `;
    }).join('');
}

// === RENDER KNOWLEDGE HUB ===
async function renderKnowledgeHub() {
    const tableBody = document.getElementById('knowledge-hub-table');
    const items = typeof mockData !== 'undefined' ? mockData.knowledgeHub : [];

    if (items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #808080;">No files found</td></tr>';
        return;
    }

    tableBody.innerHTML = items.map(item => {
        const activeBadge = item.Active
            ? '<span class="status-badge active-badge">ACTIVE</span>'
            : '<span class="status-badge inactive-badge">INACTIVE</span>';

        return `
            <tr>
                <td><strong>${item.Type}</strong></td>
                <td>${item.Template}</td>
                <td>${item.UpdatedBy}</td>
                <td>${activeBadge}</td>
                <td>${item.UsedBy}</td>
                <td><a href="${item.Link}" class="resource-link">Click to open</a></td>
            </tr>
        `;
    }).join('');
}

// === RENDER TASKS ===
async function renderTasks() {
    const pendingTasks = typeof mockData !== 'undefined' ? mockData.tasksPending : [];
    const completedTasks = typeof mockData !== 'undefined' ? mockData.tasksCompleted : [];

    // Store all data
    viewState.pending.allData = pendingTasks;
    viewState.completed.allData = completedTasks;

    // Show only 3 items unless expanded
    const pendingToShow = viewState.pending.expanded ? pendingTasks : pendingTasks.slice(0, 3);
    const completedToShow = viewState.completed.expanded ? completedTasks : completedTasks.slice(0, 3);

    // Hide "View all" button if 3 or fewer items
    const pendingBtn = document.getElementById('pending-tasks-see-all');
    const completedBtn = document.getElementById('completed-tasks-see-all');
    if (pendingBtn) pendingBtn.style.display = pendingTasks.length <= 3 ? 'none' : 'inline-block';
    if (completedBtn) completedBtn.style.display = completedTasks.length <= 3 ? 'none' : 'inline-block';

    // Render pending tasks
    renderTaskTable('pending-tasks-table', pendingToShow);

    // Render completed tasks
    renderTaskTable('completed-tasks-table', completedToShow);
}

// === HELPER: RENDER TASK TABLE ===
function renderTaskTable(tableId, tasks) {
    const tableBody = document.getElementById(tableId);

    if (tasks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #808080;">No tasks found</td></tr>';
        return;
    }

    tableBody.innerHTML = tasks.map(task => {
        return `
            <tr>
                <td><strong>${task.Title}</strong></td>
                <td><span class="status-badge progress-badge">${task.Status}</span></td>
                <td>${task.Assigned}</td>
                <td>${task.Attachment}</td>
                <td>${task.Company}</td>
                <td>${task.Deadline}</td>
            </tr>
        `;
    }).join('');
}

// === INITIALIZE DASHBOARD ===
async function initDashboard() {
    displayUserRole();
    setupDropdown();

    // Load home view data
    await Promise.all([
        renderCustomers(),
        renderTeam(),
        renderJobsOverview()
    ]);
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}
