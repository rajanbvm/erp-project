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

        productId: "PROD-001",
        productName: "ERP & CRM Implementation",
        unitPrice: "25000",
        quantity: "1",

        quotationValue: "25000",
        discount: "5",
        vat: "5",

        discountAmount: "1250",
        vatAmount: "1187.5",
        grandTotal: "24937.5",

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

        customer: "ABC Techno",
        contactPerson: "Sara Mehta",
        email: "sara@abcretail.com",
        phone: "+91 98765 43210",

        industry: "Retail",
        source: "Website",

        productId: "PROD-002",
        productName: "CRM Solution",
        unitPrice: "48000",
        quantity: "1",

        quotationValue: "48000",
        discount: "10",
        vat: "5",

        discountAmount: "4800",
        vatAmount: "2160",
        grandTotal: "45360",

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