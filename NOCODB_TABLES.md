# NocoDB Table Schemas

Setup guide for connecting your dashboard to NocoDB.

---

## Table 1: **Companies**
Customer/client company information

| Field Name | Type | Example |
|------------|------|---------|
| Firmenname | SingleLineText | "TechVision Inc" |
| Submitted | SingleLineText | "11.15.2024" |
| Quota | SingleLineText | "3/10" |
| Country | SingleLineText | "USA" |

---

## Table 2: **Team**
Team member details

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

---

## Table 3: **Jobs**
Job listing management

| Field Name | Type | Example |
|------------|------|---------|
| Job title | SingleLineText | "Senior Software Engineer" |
| Status | SingleSelect | Live / Approved / Review / Submitted |
| Location | SingleLineText | "San Francisco" |
| Slots | Number | 8 |
| Assigned | SingleLineText | "Mark" |
| Submitted | SingleLineText | "11.15.2024" |
| LaunchDate | SingleLineText | "11.20.2024" |
| Deadline | SingleLineText | "12.15.2024" |
| Company | SingleLineText | "TechVision Inc" |
| Task | SingleLineText | "Candidate Sourcing" |

---

## Table 4: **Reviews**
Quick customer review metrics

| Field Name | Type | Example |
|------------|------|---------|
| Company | SingleLineText | "TechVision Inc" |
| Rating | Number | 5 |
| JobRef | SingleLineText | "Vanessa" |
| Qualified | Number | 0 |
| Unqualified | Number | 5 |
| Submitted | SingleLineText | "11.15.2024" |

---

## Table 5: **Detailed Reviews**
Full customer testimonials

| Field Name | Type | Example |
|------------|------|---------|
| Company | SingleLineText | "TechVision Inc" |
| Representative | SingleLineText | "Michael Chen" |
| Position | SingleLineText | "HR Director" |
| Date | SingleLineText | "11.20.2024" |
| Rating | Number | 5 |
| Review | LongText | "Outstanding service! The team..." |

---

## Table 6: **Tasks Pending**
Active tasks

| Field Name | Type | Example |
|------------|------|---------|
| Title | SingleLineText | "Review candidate applications" |
| Status | SingleLineText | "Progress" |
| Assigned | SingleLineText | "Mark" |
| Attachment | SingleLineText | "Job listing" |
| Company | SingleLineText | "TechVision Inc" |
| Deadline | SingleLineText | "15.12.2024" |

---

## Table 7: **Tasks Completed**
Finished tasks (same structure as Pending)

| Field Name | Type | Example |
|------------|------|---------|
| Title | SingleLineText | "Finalize contract terms" |
| Status | SingleLineText | "Progress" |
| Assigned | SingleLineText | "Mark" |
| Attachment | SingleLineText | "Job listing" |
| Company | SingleLineText | "FinanceHub Corp" |
| Deadline | SingleLineText | "10.12.2024" |

---

## Table 8: **Knowledge Hub**
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

1. Create these 8 tables in NocoDB
2. Import mock data from `data.js` or add manually
3. Copy table IDs from NocoDB URLs
4. Update `config.local.js` with your table IDs
5. Dashboard will automatically connect and fetch data

---

**Note:** You can combine Tasks Pending and Tasks Completed into one table with a "Completed" checkbox field if preferred.
