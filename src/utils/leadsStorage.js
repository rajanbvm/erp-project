const STORAGE_KEY = "leadsData";

const defaultLeads = [
  {
    id: 1,

    // Header
    lead: "Ahmed Hassan",
    company: "Falcon Group LLC",
    primaryPhone: "+971 52 234 5678",
    email: "ahmed@falcon.ae",

    // Status Chips
    status: "Qualified",
    Leadsource: "Google Ads",
    score: 95,

    // Lead Information
    owner: "John Doe",
    priority: "High",
    industry: "Construction",
    companySize: "201-500 Employees",
    annualRevenue: "AED 120 Million",
    website: "falcongroup.ae",
    budget: "AED 50,000",

    // Notes
    notes: "Looking for ERP & CRM implementation within 2 months.",

    // Activity
    nextFollowUp: "18 Jun 2026, 11:00 AM - Product Demo",
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

    // Header
    lead: "Sara Mehta",
    company: "ABC Retail Pvt Ltd",
    primaryPhone: "+91 98765 43210",
    email: "sara@abcretail.com",

    // Status Chips
    status: "Proposal Sent",
    Leadsource: "Website",
    score: 82,

    // Lead Information
    owner: "Sarah Wilson",
    priority: "Medium",
    industry: "Retail",
    companySize: "51-200 Employees",
    annualRevenue: "₹45 Crore",
    website: "abcretail.com",
    budget: "₹25,00,000",

    // Notes
    notes: "Proposal shared with client. Awaiting management approval.",

    // Activity
    nextFollowUp: "20 Jun 2026, 03:30 PM - Video Meeting",
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

    // Header
    lead: "Ravi Kumar",
    company: "XYZ Industries",
    primaryPhone: "+91 99998 87766",
    email: "ravi@xyzindustries.in",

    // Status Chips
    status: "Contacted",
    Leadsource: "Facebook",
    score: 68,

    // Lead Information
    owner: "Mike Johnson",
    priority: "Low",
    industry: "Manufacturing",
    companySize: "21-50 Employees",
    annualRevenue: "₹18 Crore",
    website: "xyzindustries.in",
    budget: "₹10,00,000",

    // Notes
    notes: "Client requested inventory module demonstration before final discussion.",

    // Activity
    nextFollowUp: "22 Jun 2026, 10:00 AM - Phone Call",
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