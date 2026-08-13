const STORAGE_KEY = "opportunitiesData";

const defaultOpportunities = [
  {
    id: "OPP-001",
    opportunity: "Falcon ERP Setup",
    company: "Falcon Group LLC",
    contact: "ahmed@falcon.ae",
    value: "45000",
    probability: "20",
    stage: "Qualification",
    owner: "John Doe",
    closeDate: "2026-07-15",
  },
  {
    id: "OPP-002",
    opportunity: "HR Software Package",
    company: "Falcon Group LLC",
    contact: "ahmed@falcon.ae",
    value: "45000",
    probability: "40",
    stage: "Proposal sent",
    owner: "John Doe",
    closeDate: "2026-07-15",
  },
  {
    id: "OPP-003",
    opportunity: "Full ERP Package",
    company: "Falcon Group LLC",
    contact: "ahmed@falcon.ae",
    value: "45000",
    probability: "60",
    stage: "Negotiation",
    owner: "John Doe",
    closeDate: "2026-07-15",
  },
  {
    id: "OPP-004",
    opportunity: "CRM Starter",
    company: "Falcon Group LLC",
    contact: "ahmed@falcon.ae",
    value: "45000",
    probability: "100",
    stage: "Won",
    owner: "John Doe",
    closeDate: "2026-07-15",
  },
];


// Initialize Opportunities
export const initializeOpportunities = () => {
  if (typeof window === "undefined") return;

  const existingData = localStorage.getItem(STORAGE_KEY);

  if (!existingData) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultOpportunities)
    );
  }
};


// Get All Opportunities
export const getOpportunities = () => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};


// Get Opportunity By ID
export const getOpportunityById = (id) => {
  if (typeof window === "undefined") return null;

  const opportunities = getOpportunities();

  return opportunities.find(
    (opportunity) => opportunity?.id === id
  );
};


// Add Opportunity
export const addOpportunity = (opportunity) => {
  if (typeof window === "undefined") return null;

  const opportunities = getOpportunities();

  const newOpportunity = {
    ...opportunity,
    id: generateOpportunityId(opportunities),
  };

  const updatedOpportunities = [
    ...opportunities,
    newOpportunity,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedOpportunities)
  );

  return newOpportunity;
};


// Update Opportunity
export const updateOpportunity = (id, updatedData) => {
  if (typeof window === "undefined") return null;

  const opportunities = getOpportunities();

  const updatedOpportunities = opportunities.map(
    (opportunity) =>
      opportunity?.id === id
        ? {
            ...opportunity,
            ...updatedData,
            id: opportunity?.id,
          }
        : opportunity
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedOpportunities)
  );

  return updatedOpportunities.find(
    (opportunity) => opportunity?.id === id
  );
};


// Delete Opportunity
export const deleteOpportunity = (id) => {
  if (typeof window === "undefined") return false;

  const opportunities = getOpportunities();

  const updatedOpportunities = opportunities.filter(
    (opportunity) => opportunity?.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedOpportunities)
  );

  return true;
};


// Generate Opportunity ID
const generateOpportunityId = (opportunities) => {
  if (!opportunities.length) {
    return "OPP-001";
  }

  const numbers = opportunities
    .map((opportunity) => {
      const match = opportunity?.id?.match(/OPP-(\d+)/);

      return match
        ? parseInt(match[1], 10)
        : 0;
    })
    .filter(Boolean);

  const nextNumber =
    numbers.length > 0
      ? Math.max(...numbers) + 1
      : 1;

  return `OPP-${String(nextNumber).padStart(3, "0")}`;
};