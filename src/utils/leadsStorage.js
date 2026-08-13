const STORAGE_KEY = "leadsData";

const defaultLeads = [
  {
    id: 1,
    lead: "Ahmed Hassan",
    designation: "Procurement Head",

    company: "Falcon Group LLC",
    website: "falcongroup.ae",
    industryType: "Construction",
    companySize: "201-500 Employees",
    annualRevenue: "$32 Million",
    businessAddress: "Dubai, UAE",

    primaryPhone: "+971 52 234 5678",
    secondaryPhone: "+971 4 123 4567",
    email: "ahmed@falcon.ae",
    whatsapp: "+971 52 234 5678",
    linkedin: "linkedin.com/in/ahmedhassan",
    preferredCommunication: "Phone",

    source: "Google Ads",
    owner: "John Doe",
    status: "Qualified",
    score: 95,
    assignmentMode: "Manual",
    priority: "High",

    budget: "Above $100,000",
    followUpType: "Phone Call",
    followUpDate: "2026-06-18",
    followUpTime: "11:00",

    requirement: "ERP & CRM implementation",
    remarks: "Interested in cloud solution.",
    notes: "Looking for ERP & CRM implementation within 2 months.",

     // Activity
    // nextFollowUp: "18 Jun 2026, 11:00 AM - Product Demo",

    lastCall: "Yesterday · 14 min · Interested",
    openTasks: "Prepare pricing sheet",
    meetingsScheduled: "1 upcoming, 2 completed",

    // Documents
    documents: [
      {
        id: 1,
        file: "Proposal.pdf",
        category: "Proposal",
        version: "V2.0",
        uploadedBy: "John Doe",
        created: "20 Jun 2026",
      },
      {
        id: 2,
        file: "Requirements.xlsx",
        category: "Customer",
        version: "V1.0",
        uploadedBy: "Sarah Wilson",
        created: "18 Jun 2026",
      },
    ],

    created: "10 Jun 2026",
  },

  {
    id: 2,
    lead: "Sara Mehta",
    designation: "Operations Manager",

    company: "ABC Retail Pvt Ltd",
    website: "abcretail.com",
    industryType: "Retail",
    companySize: "51-200 Employees",
    annualRevenue: "$8 Million",
    businessAddress: "Jaipur, Rajasthan, India",

    primaryPhone: "+91 98765 43210",
    secondaryPhone: "+91 141 456 7890",
    email: "sara@abcretail.com",
    whatsapp: "+91 98765 43210",
    linkedin: "linkedin.com/in/saramehta",
    preferredCommunication: "Email",

    source: "Website",
    owner: "Sarah Wilson",
    status: "Proposal sent",
    score: 82,
    assignmentMode: "Manual",
    priority: "Medium",

    budget: "$25,000 - $50,000",
    followUpType: "Video Meeting",
    followUpDate: "2026-06-20",
    followUpTime: "15:30",

    requirement: "Retail ERP with Inventory Management",
    remarks: "Proposal submitted. Waiting for approval.",
    notes: "Proposal shared with client. Awaiting management approval.",

   // Activity
    // nextFollowUp: "20 Jun 2026, 03:30 PM - Video Meeting",

    lastCall: "2 Days Ago · 10 min · Proposal Discussed",
    openTasks: "Send revised commercial proposal",
    meetingsScheduled: "2 upcoming, 1 completed",

    // Documents
    documents: [
      {
        id: 1,
        file: "CommercialProposal.pdf",
        category: "Proposal",
        version: "V1.0",
        uploadedBy: "Sarah Wilson",
        created: "19 Jun 2026",
      },
      {
        id: 2,
        file: "RequirementDoc.docx",
        category: "Customer",
        version: "V1.0",
        uploadedBy: "Sara Mehta",
        created: "18 Jun 2026",
      },
    ],

    created: "11 Jun 2026",
  },

  {
    id: 3,
    lead: "Ravi Kumar",
    designation: "Purchase Manager",

    company: "XYZ Industries",
    website: "xyzindustries.in",
    industryType: "Manufacturing",
    companySize: "21-50 Employees",
    annualRevenue: "$3 Million",
    businessAddress: "Ahmedabad, Gujarat, India",

    primaryPhone: "+91 99998 87766",
    secondaryPhone: "+91 79 2222 3333",
    email: "ravi@xyzindustries.in",
    whatsapp: "+91 99998 87766",
    linkedin: "linkedin.com/in/ravikumar",
    preferredCommunication: "WhatsApp",

    source: "Facebook",
    owner: "Mike Johnson",
    status: "Contacted",
    score: 68,
    assignmentMode: "Manual",
    priority: "Low",

    budget: "$10,000 - $25,000",
    followUpType: "Video Meeting",
    followUpDate: "2026-06-22",
    followUpTime: "10:00",

    requirement: "Inventory & Production Management System",
    remarks: "Requested product demo.",
    notes: "Client requested inventory module demonstration before final discussion.",

    // Activity
    // nextFollowUp: "22 Jun 2026, 10:00 AM - Phone Call",

    lastCall: "Today · 8 min · Demo Scheduled",
    openTasks: "Prepare inventory module presentation",
    meetingsScheduled: "1 upcoming, 0 completed",

    // Documents
    documents: [
      {
        id: 1,
        file: "InventoryProposal.pdf",
        category: "Proposal",
        version: "V1.0",
        uploadedBy: "Mike Johnson",
        created: "21 Jun 2026",
      },
      {
        id: 2,
        file: "CompanyProfile.pdf",
        category: "Customer",
        version: "V1.0",
        uploadedBy: "Ravi Kumar",
        created: "20 Jun 2026",
      },
    ],

    created: "12 Jun 2026",
  },
];

export const initializeLeads = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultLeads));
  }
};

export const getLeads = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const saveLeads = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getLeadById = (id) => {
  return getLeads().find((item) => item.id === Number(id));
};

export const deleteLead = (id) => {
  const data = getLeads().filter((item) => item.id !== Number(id));
  saveLeads(data);
};

export const addLead = (lead) => {
  const data = getLeads();

  data.push({
    ...lead,
    id: data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1,
  });

  saveLeads(data);
};

export const updateLead = (id, updatedLead) => {
  const data = getLeads().map((item) =>
    item.id === Number(id)
      ? { ...item, ...updatedLead }
      : item
  );

  saveLeads(data);
};