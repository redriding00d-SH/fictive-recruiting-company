// Mock data from CSV files
const mockData = {
    companies: [
        { Firmenname: "TechVision Inc", Submitted: "11.15.2024", Quota: "3/10", Country: "USA" },
        { Firmenname: "DataFlow Solutions", Submitted: "11.22.2024", Quota: "7/15", Country: "USA" },
        { Firmenname: "CloudNine Systems", Submitted: "12.01.2024", Quota: "2/8", Country: "USA" },
        { Firmenname: "GreenTech Industries", Submitted: "12.05.2024", Quota: "8/12", Country: "USA" },
        { Firmenname: "FinanceHub Corp", Submitted: "11.10.2024", Quota: "14/20", Country: "USA" },
        { Firmenname: "MediCare Solutions", Submitted: "11.18.2024", Quota: "7/10", Country: "USA" },
        { Firmenname: "AutoMotive Dynamics", Submitted: "11.25.2024", Quota: "10/15", Country: "USA" },
        { Firmenname: "FoodTech Innovations", Submitted: "12.02.2024", Quota: "5/8", Country: "USA" }
    ],

    team: [
        { "First name": "Vince", "Last name": "Fredericks", Roles: "Marketing", Company: "TechVision Inc", Email: "vince.f@agency.com", "Vacation Days": 12, Workdays: 22, Status: "Active" },
        { "First name": "Sarah", "Last name": "Mitchell", Roles: "Account Manager", Company: "DataFlow Solutions", Email: "sarah.m@agency.com", "Vacation Days": 8, Workdays: 20, Status: "Active" },
        { "First name": "Marcus", "Last name": "Chen", Roles: "Recruiter", Company: "CloudNine Systems", Email: "marcus.c@agency.com", "Vacation Days": 15, Workdays: 21, Status: "Active" },
        { "First name": "Lisa", "Last name": "Rodriguez", Roles: "Marketing", Company: "FinanceHub Corp", Email: "lisa.r@agency.com", "Vacation Days": 5, Workdays: 18, Status: "On Leave" },
        { "First name": "David", "Last name": "Thompson", Roles: "Account Manager", Company: "MediCare Solutions", Email: "david.t@agency.com", "Vacation Days": 10, Workdays: 22, Status: "Active" },
        { "First name": "Emma", "Last name": "Wagner", Roles: "Recruiter", Company: "GreenTech Industries", Email: "emma.w@agency.com", "Vacation Days": 14, Workdays: 20, Status: "Active" },
        { "First name": "Oliver", "Last name": "Schulz", Roles: "Marketing", Company: "AutoMotive Dynamics", Email: "oliver.s@agency.com", "Vacation Days": 7, Workdays: 19, Status: "Active" },
        { "First name": "Sophie", "Last name": "Anderson", Roles: "Account Manager", Company: "EduLearn Platform", Email: "sophie.a@agency.com", "Vacation Days": 11, Workdays: 21, Status: "Active" },
        { "First name": "James", "Last name": "Murphy", Roles: "Recruiter", Company: "RetailMax Group", Email: "james.m@agency.com", "Vacation Days": 9, Workdays: 22, Status: "Active" },
        { "First name": "Nina", "Last name": "Patel", Roles: "Marketing", Company: "FoodTech Innovations", Email: "nina.p@agency.com", "Vacation Days": 13, Workdays: 20, Status: "Active" }
    ],

    jobs: [
        { "Job title": "Senior Software Engineer", Status: "Live", Location: "San Francisco", Slots: 8, Assigned: "Mark", Submitted: "11.15.2024", LaunchDate: "11.20.2024", Deadline: "12.15.2024" },
        { "Job title": "Data Analyst", Status: "Live", Location: "New York", Slots: 5, Assigned: "Sarah", Submitted: "11.22.2024", LaunchDate: "11.25.2024", Deadline: "12.22.2024" },
        { "Job title": "DevOps Engineer", Status: "Approved", Location: "Remote", Slots: 3, Assigned: "Mark", Submitted: "12.01.2024", LaunchDate: "12.10.2024", Deadline: "" },
        { "Job title": "Product Manager", Status: "Submitted", Location: "Boston", Slots: 2, Assigned: "", Task: "", Submitted: "12.08.2024", LaunchDate: "", Deadline: "", Company: "TechVision Inc" },
        { "Job title": "Marketing Specialist", Status: "Submitted", Location: "Austin", Slots: 4, Assigned: "", Task: "", Submitted: "12.09.2024", LaunchDate: "", Deadline: "", Company: "DataFlow Solutions" },
        { "Job title": "HR Coordinator", Status: "Submitted", Location: "Remote", Slots: 3, Assigned: "", Task: "", Submitted: "12.10.2024", LaunchDate: "", Deadline: "", Company: "CloudNine Systems" },
        { "Job title": "Sustainability Manager", Status: "Live", Location: "Seattle", Slots: 6, Assigned: "Emma", Submitted: "12.05.2024", LaunchDate: "12.07.2024", Deadline: "01.05.2025" },
        { "Job title": "Financial Analyst", Status: "Live", Location: "Chicago", Slots: 10, Assigned: "David", Submitted: "11.10.2024", LaunchDate: "11.15.2024", Deadline: "12.10.2024" },
        { "Job title": "Senior Accountant", Status: "Review", Location: "Boston", Slots: 4, Assigned: "Lisa", Submitted: "11.28.2024", LaunchDate: "", Deadline: "12.28.2024" },
        { "Job title": "Registered Nurse", Status: "Live", Location: "Los Angeles", Slots: 12, Assigned: "Sophie", Submitted: "11.18.2024", LaunchDate: "11.21.2024", Deadline: "12.18.2024" },
        { "Job title": "Automotive Engineer", Status: "Approved", Location: "Detroit", Slots: 7, Assigned: "Oliver", Submitted: "11.25.2024", LaunchDate: "12.05.2024", Deadline: "" },
        { "Job title": "Food Safety Specialist", Status: "Live", Location: "Austin", Slots: 5, Assigned: "Nina", Submitted: "12.02.2024", LaunchDate: "12.04.2024", Deadline: "01.02.2025" },
        { "Job title": "Learning Platform Developer", Status: "Review", Location: "Remote", Slots: 3, Assigned: "Marcus", Submitted: "11.08.2024", LaunchDate: "", Deadline: "12.08.2024" },
        { "Job title": "Store Manager", Status: "Live", Location: "Miami", Slots: 8, Assigned: "James", Submitted: "11.28.2024", LaunchDate: "12.01.2024", Deadline: "12.28.2024" },
        { "Job title": "UX/UI Designer", Status: "Approved", Location: "Portland", Slots: 4, Assigned: "Vince", Submitted: "11.18.2024", LaunchDate: "12.01.2024", Deadline: "" },
        { "Job title": "Teacher for Special Needs", Status: "Review", Location: "Georgetown", Slots: 10, Assigned: "Mark", Submitted: "11.30.2024", LaunchDate: "", Deadline: "01.15.2025" },
        { "Job title": "Topsiedown Network Admin", Status: "Review", Location: "Remote", Slots: 3, Assigned: "Sarah", Submitted: "12.03.2024", LaunchDate: "", Deadline: "01.03.2025" },
        { "Job title": "Georgetown Sales Rep", Status: "Approved", Location: "Manhattan", Slots: 5, Assigned: "Mark", Submitted: "12.01.2024", LaunchDate: "12.15.2024", Deadline: "" }
    ],

    reviews: [
        { Company: "TechVision Inc", Rating: 5, JobRef: "Vanessa", Qualified: 0, Unqualified: 5, Submitted: "11.15.2024" },
        { Company: "DataFlow Solutions", Rating: 5, JobRef: "Vanessa", Qualified: 1, Unqualified: 0, Submitted: "11.22.2024" },
        { Company: "CloudNine Systems", Rating: 5, JobRef: "Andy", Qualified: 0, Unqualified: 4, Submitted: "12.01.2024" },
        { Company: "GreenTech Industries", Rating: 4, JobRef: "Mark", Qualified: 3, Unqualified: 2, Submitted: "12.05.2024" },
        { Company: "FinanceHub Corp", Rating: 5, JobRef: "Sarah", Qualified: 2, Unqualified: 0, Submitted: "11.10.2024" },
        { Company: "MediCare Solutions", Rating: 4, JobRef: "Lisa", Qualified: 1, Unqualified: 3, Submitted: "11.18.2024" }
    ],

    knowledgeHub: [
        { Type: "Approval", Template: "Checklist", UpdatedBy: "Sam", Active: true, UsedBy: "Marketing", Link: "#" },
        { Type: "Contract", Template: "Standard Agreement", UpdatedBy: "Emma", Active: true, UsedBy: "Recruiting", Link: "#" },
        { Type: "Onboarding", Template: "Welcome Guide", UpdatedBy: "Marcus", Active: false, UsedBy: "Account Management", Link: "#" },
        { Type: "Review", Template: "Performance Template", UpdatedBy: "Sarah", Active: true, UsedBy: "All Teams", Link: "#" }
    ],

    tasksPending: [
        { Title: "Review candidate applications", Status: "Progress", Assigned: "Mark", Attachment: "Job listing", Company: "TechVision Inc", Deadline: "15.12.2024" },
        { Title: "Update job posting content", Status: "Progress", Assigned: "Sarah", Attachment: "Job listing", Company: "DataFlow Solutions", Deadline: "18.12.2024" },
        { Title: "Schedule client meeting", Status: "Progress", Assigned: "Mark", Attachment: "Job listing", Company: "CloudNine Systems", Deadline: "20.12.2024" },
        { Title: "Prepare recruitment report", Status: "Progress", Assigned: "Emma", Attachment: "Job listing", Company: "GreenTech Industries", Deadline: "22.12.2024" }
    ],

    tasksCompleted: [
        { Title: "Finalize contract terms", Status: "Progress", Assigned: "Mark", Attachment: "Job listing", Company: "FinanceHub Corp", Deadline: "10.12.2024" },
        { Title: "Conduct initial screening", Status: "Progress", Assigned: "Sarah", Attachment: "Job listing", Company: "MediCare Solutions", Deadline: "12.12.2024" },
        { Title: "Send offer letter", Status: "Progress", Assigned: "Mark", Attachment: "Job listing", Company: "AutoMotive Dynamics", Deadline: "14.12.2024" }
    ],

    detailedReviews: [
        {
            Company: "TechVision Inc",
            Representative: "Michael Chen",
            Position: "HR Director",
            Date: "11.20.2024",
            Rating: 5,
            Review: "Outstanding service! The team at the agency provided us with highly qualified candidates within just two weeks. Their understanding of our technical requirements was impressive, and the screening process was thorough. We've already hired 3 engineers from their submissions. Highly recommended for tech recruitment."
        },
        {
            Company: "DataFlow Solutions",
            Representative: "Sarah Martinez",
            Position: "Talent Acquisition Lead",
            Date: "11.28.2024",
            Rating: 5,
            Review: "We've been working with this agency for the past 6 months and the results have been exceptional. They truly understand the data analytics space and consistently deliver candidates who are not only technically skilled but also a great cultural fit. The communication throughout the process has been seamless."
        },
        {
            Company: "CloudNine Systems",
            Representative: "David Thompson",
            Position: "VP of Operations",
            Date: "12.05.2024",
            Rating: 5,
            Review: "Professional, responsive, and results-driven. The agency helped us fill 4 critical DevOps positions in record time. Their candidate vetting process is top-notch, saving us countless hours in interviews. The account manager was always available and proactive in addressing our needs."
        },
        {
            Company: "GreenTech Industries",
            Representative: "Emma Rodriguez",
            Position: "Chief People Officer",
            Date: "12.08.2024",
            Rating: 4,
            Review: "Very satisfied with the overall experience. The agency provided strong candidates for our sustainability roles, which can be challenging to fill. While there were a few candidates who didn't quite match our requirements, the team was quick to adjust and refine their search. Good partnership overall."
        },
        {
            Company: "FinanceHub Corp",
            Representative: "James Wilson",
            Position: "Recruitment Manager",
            Date: "11.15.2024",
            Rating: 5,
            Review: "Exceptional service from start to finish. The agency's knowledge of the financial services industry is evident in the quality of candidates they present. They filled 14 positions for us across various departments, and all hires are performing excellently. The ROI on their service has been outstanding."
        },
        {
            Company: "MediCare Solutions",
            Representative: "Dr. Lisa Patel",
            Position: "Head of Staffing",
            Date: "11.22.2024",
            Rating: 4,
            Review: "Good experience working with the team. They understand the healthcare sector's unique requirements and compliance needs. The candidates were well-prepared and professional. Response time could be improved during peak hiring season, but overall a reliable partner for our nursing and administrative staff needs."
        }
    ]
};
