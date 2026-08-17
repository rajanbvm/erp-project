const STORAGE_KEY = "quotationData";

const defaultQuotations = [
  {
    id: 1,
    quotationNo: "QT-2026-0001",
    customer: "Falcon Group LLC",
    contactPerson: "Ahmed Hassan",
    email: "ahmed@falcon.ae",
    phone: "+971 52 234 5678",

    industry: "Construction",
    source: "Google Ads",

    quotationValue: "25000",
    discount: "5",
    vat: "5",

    paymentTerms: "50% Advance, 50% On Delivery",
    owner: "John Doe",
    priority: "High",

    notes: "ERP & CRM implementation quotation.",

    approvalPath: "Sales Manager → Finance → CEO",
    firstApprover: "Priya Sharma",

    status: "Pending Approval",
    created: "10 Jun 2026",
  },

  {
    id: 2,
    quotationNo: "QT-2026-0002",
    customer: "ABC Retail Pvt Ltd",
    contactPerson: "Sara Mehta",
    email: "sara@abcretail.com",
    phone: "+91 98765 43210",

    industry: "Retail",
    source: "Website",

    quotationValue: "48000",
    discount: "10",
    vat: "5",

    paymentTerms: "100% Advance",
    owner: "Sarah Wilson",
    priority: "Medium",

    notes: "Quotation sent for approval.",

    approvalPath: "Sales Manager",
    firstApprover: "Rahul Sharma",

    status: "Approved",
    created: "11 Jun 2026",
  },
];

/* Initialize */

export const initializeQuotations = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultQuotations)
    );
  }
};

/* Get All */

export const getQuotations = () => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

/* Save */

export const saveQuotations = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/* Get By Id */

export const getQuotationById = (id) => {
  return getQuotations().find(
    (item) => item.id === Number(id)
  );
};

/* Delete */

export const deleteQuotation = (id) => {
  const data = getQuotations().filter(
    (item) => item.id !== Number(id)
  );

  saveQuotations(data);
};

/* Add */

export const addQuotation = (quotation) => {
    const data = getQuotations();

    const newQuotation = {
        ...quotation,
        id: data.length
            ? Math.max(...data.map((x) => x.id)) + 1
            : 1,
    };

    data.push(newQuotation);

    saveQuotations(data);

    return newQuotation;
};

/* Update */

export const updateQuotation = (id, updatedQuotation) => {
  const data = getQuotations().map((item) =>
    item.id === Number(id)
      ? { ...item, ...updatedQuotation }
      : item
  );

  saveQuotations(data);
};