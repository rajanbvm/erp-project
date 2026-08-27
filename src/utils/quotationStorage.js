const STORAGE_KEY = "quotationData";

const defaultQuotations = [
    {
        id: 1,
        quotationNo: "QT-2026-0001",

        // Customer Info
        customer: "Falcon Group LLC",
        contactPerson: "Ahmed Hassan",
        email: "ahmed@falcon.ae",
        phone: "+971 52 234 5678",
        industry: "Construction",
        source: "",

        // Product
        productId: "PRD-001",
        productName: "CRM Software",
        unitPrice: "500",
        quantity: "1",

        // Pricing
        quotationValue: "500",
        discount: "5",
        vat: "5",

        discountAmount: "25",
        vatAmount: "23.75",
        grandTotal: "498.75",

        // Other Details
        paymentTerms: "50% Advance, 50% On Delivery",
        owner: "John Doe",
        priority: "High",

        notes: "CRM Software quotation.",

        // Approval
        approvalPath: "",
        firstApprover: "",

        // System
        status: "Pending Approval",
        created: "24 Aug 2026",
    },

    {
        id: 2,
        quotationNo: "QT-2026-0002",

        // Customer Info
        customer: "ABC Techno",
        contactPerson: "Sara Mehta",
        email: "sara@abcretail.com",
        phone: "+91 98765 43210",
        industry: "Retail",
        source: "",

        // Product
        productId: "PRD-002",
        productName: "ERP Software",
        unitPrice: "800",
        quantity: "1",

        // Pricing
        quotationValue: "800",
        discount: "10",
        vat: "5",

        discountAmount: "80",
        vatAmount: "36",
        grandTotal: "756",

        // Other Details
        paymentTerms: "100% Advance",
        owner: "Sarah Wilson",
        priority: "Medium",

        notes: "ERP Software quotation.",

        // Approval
        approvalPath: "",
        firstApprover: "",

        // System
        status: "Approved",
        created: "23 Aug 2026",
    },

    {
        id: 3,
        quotationNo: "QT-2026-0003",

        // Customer Info
        customer: "Tech Solutions LLC",
        contactPerson: "Mohammed Ali",
        email: "mohammed@techsolutions.ae",
        phone: "+971 50 123 4567",
        industry: "Technology",
        source: "",

        // Product
        productId: "PRD-003",
        productName: "Business Analytics",
        unitPrice: "300",
        quantity: "2",

        // Pricing
        quotationValue: "600",
        discount: "15",
        vat: "5",

        discountAmount: "90",
        vatAmount: "25.5",
        grandTotal: "535.5",

        // Other Details
        paymentTerms: "50% Advance, 50% On Delivery",
        owner: "John Doe",
        priority: "Low",

        notes: "Business Analytics and reporting solution.",

        // Approval
        approvalPath: "",
        firstApprover: "",

        // System
        status: "Draft",
        created: "24 Aug 2026",
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

    const nextNumber = data.length
        ? Math.max(
            ...data.map((item) => {
                const match = item?.quotationNo?.match(/\d+$/);
                return match ? Number(match[0]) : 0;
            })
        ) + 1
        : 1;

    const quotationNo = `QT-${new Date().getFullYear()}-${String(
        nextNumber
    ).padStart(4, "0")}`;

    const created = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const newQuotation = {
        ...quotation,

        id: data.length
            ? Math.max(...data.map((x) => Number(x.id) || 0)) + 1
            : 1,

        quotationNo,
        created,

        // New quotations start as Draft
        status: "Draft",
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