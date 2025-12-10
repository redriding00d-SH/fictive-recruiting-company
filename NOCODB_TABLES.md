# NocoDB Table Schemas

Setup guide for connecting your dashboard to NocoDB. Import the CSV files from the `tables/` folder directly into NocoDB to get started quickly.

---

## Table 1: **Company**
Customer/client company information

| Field Name | Type | Example |
|------------|------|---------|
| Firmenname | SingleLineText | "TechVision Inc" |
| no | Number | 1 |
| Address | SingleLineText | "123 Innovation Drive" |
| Zip Code | Number | 94025 |
| Country | SingleLineText | "USA" |
| Kundens | Number | 1 |
| Mitarbeiters | Number | 3 |
| Tasks | Number | 2 |
| Job listings | Number | 3 |
| Quota | SingleLineText | "3/10" |
| Product | SingleLineText | "Premium" |
| Submitted | SingleLineText | "11.15.2024" |

**CSV File:** `Company (Default View).csv`

---

## Table 2: **Team**
Agency team member details

| Field Name | Type | Example |
|------------|------|---------|
| First name | SingleLineText | "Vince" |
| Last name | SingleLineText | "Fredericks" |
| Roles | SingleLineText | "Marketing" |
| Company | SingleLineText | "TechVision Inc" |
| Email | Email | "vince.f@agency.com" |
| Vacation Days | Number | 12 |
| Workdays | Number | 22 |
| Status | SingleLineText | "Active" |

**CSV File:** `Team (Default View).csv`

---

## Table 3: **Company Rep**
Client company representatives and contacts

| Field Name | Type | Example |
|------------|------|---------|
| First name | SingleLineText | "Michael" |
| Last name | SingleLineText | "Weber" |
| Title | SingleLineText | "Mr" |
| Firmen | SingleLineText | "TechVision Inc" |
| Department | SingleLineText | "Human Resources" |
| Email (internal) | Email | "michael.weber@techvision.com" |
| Phone (internal) | Phone | "+1-415-555-0123" |
| Email (external) | Email | "hr@techvision.com" |
| Phone (external) | Phone | "+1-415-555-0100" |
| Tasks | Number | 1 |
| Job listings | Number | 3 |

**CSV File:** `Company Rep (Default View).csv`

---

## Table 4: **Job listings**
Complete job posting information

| Field Name | Type | Example |
|------------|------|---------|
| Job title | SingleLineText | "Senior Software Engineer" |
| jobPostingId | SingleLineText | "JP-2024-001" |
| Job description | LongText | "Looking for experienced backend..." |
| Location | SingleLineText | "San Francisco CA" |
| Benefits | LongText | "Health insurance/Remote work/Gym" |
| Sources | SingleLineText | "LinkedIn" |
| Salary (min) | Number | 85000 |
| Salary (max) | Number | 115000 |
| Currency | SingleLineText | "USD" |
| Contact email | Email | "jobs@techvision.com" |
| Status | SingleSelect | Live / Approved / Review / Submitted |
| Submitted | SingleLineText | "11.15.2024" |
| Published | SingleLineText | "11.20.2024" |
| Ended | SingleLineText | "" |
| Companies | SingleLineText | "TechVision Inc" |
| Company Reps | SingleLineText | "Michael Weber" |
| Google docs | SingleLineText | "doc123" |
| Job ads | SingleLineText | "ad001" |
| Applications | Number | 12 |

**CSV File:** `Job listings (Default View).csv`

---

## Table 5: **Job ads**
Job advertising campaign tracking

| Field Name | Type | Example |
|------------|------|---------|
| Year | Number | 2024 |
| Job listings | SingleLineText | "JP-2024-001" |
| Start | SingleLineText | "11.20.2024" |
| End | SingleLineText | "01.20.2025" |

**CSV File:** `Job ads (Default View).csv`

---

## Table 6: **Applications**
Candidate applications for job postings

| Field Name | Type | Example |
|------------|------|---------|
| Date submitted | SingleLineText | "11.20.2024" |
| Job listings | SingleLineText | "JP-2024-001" |
| First name | SingleLineText | "Alex" |
| Last name | SingleLineText | "Miller" |
| Email | Email | "a.miller@email.com" |
| Phone | Phone | "+1-415-555-1234" |

**CSV File:** `Applications (Default View).csv`

---

## Table 7: **Tasks**
Project tasks and activities

| Field Name | Type | Example |
|------------|------|---------|
| Title | SingleLineText | "Review job posting for Senior Developer" |
| Start date | SingleLineText | "11.18.2024" |
| End date | SingleLineText | "11.20.2024" |
| Description | LongText | "Review and approve job description..." |
| Type | SingleLineText | "Review" |
| Teams | SingleLineText | "Marketing" |
| Companies | SingleLineText | "TechVision Inc" |
| Company Reps | SingleLineText | "Michael Weber" |
| Task Assignee | SingleLineText | "Vince Fredericks" |

**CSV File:** `Tasks (Default View).csv`

---

## Additional Mock Data Tables

The following tables are defined in `data.js` for the dashboard demo but don't have corresponding CSV files:

### **Reviews** (Mock Data)
Quick customer review metrics

| Field Name | Type | Example |
|------------|------|---------|
| Company | SingleLineText | "TechVision Inc" |
| Rating | Number | 5 |
| JobRef | SingleLineText | "Vanessa" |
| Qualified | Number | 0 |
| Unqualified | Number | 5 |
| Submitted | SingleLineText | "11.15.2024" |

### **Detailed Reviews** (Mock Data)
Full customer testimonials

| Field Name | Type | Example |
|------------|------|---------|
| Company | SingleLineText | "TechVision Inc" |
| Representative | SingleLineText | "Michael Chen" |
| Position | SingleLineText | "HR Director" |
| Date | SingleLineText | "11.20.2024" |
| Rating | Number | 5 |
| Review | LongText | "Outstanding service! The team..." |

### **Knowledge Hub** (Mock Data)
Resource library

| Field Name | Type | Example |
|------------|------|---------|
| Type | SingleLineText | "Approval" |
| Template | SingleLineText | "Checklist" |
| UpdatedBy | SingleLineText | "Sam" |
| Active | Checkbox | ✓ |
| UsedBy | SingleLineText | "Marketing" |
| Link | URL | "#" |

---

## Quick Setup

1. **Import CSV files** from the `tables/` folder directly into NocoDB:
   - Company (Default View).csv
   - Team (Default View).csv
   - Company Rep (Default View).csv
   - Job listings (Default View).csv
   - Job ads (Default View).csv
   - Applications (Default View).csv
   - Tasks (Default View).csv

2. **Create additional tables** (optional) for Reviews, Detailed Reviews, and Knowledge Hub using the schemas above

3. **Copy table IDs** from NocoDB URLs (format: `http://localhost:8080/nc/PROJECT_ID/TABLE_ID`)

4. **Configure connection**: Copy `config.js` to `config.local.js` and add:
   - Your NocoDB API token
   - Your project ID
   - Your table IDs

5. **Launch dashboard**: The app will automatically connect and fetch data from NocoDB

---

## Relationship Recommendations

Consider adding these relationships in NocoDB for enhanced functionality:

- **Company** → **Company Rep** (One-to-Many)
- **Company** → **Job listings** (One-to-Many)
- **Job listings** → **Applications** (One-to-Many)
- **Job listings** → **Job ads** (One-to-One)
- **Company Rep** → **Tasks** (One-to-Many)
- **Team** → **Tasks** (One-to-Many via Task Assignee)
