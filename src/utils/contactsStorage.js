const STORAGE_KEY = "contactsData";

const defaultContacts = [
  {
    id: "CNT-001",
    companyId: "CMP-001",
    contact: "Ahmed Hassan",
    email: "ahmed@falcon.ae",
    designation: "Sales Director",
    phone: "+971 50 123 4567",
    type: "Primary",
  },
  {
    id: "CNT-002",
    companyId: "CMP-002",
    contact: "Sara Mehta",
    email: "sara@abctechno.ae",
    designation: "CTO",
    phone: "+971 52 987 6543",
    type: "Secondary",
  },
  {
    id: "CNT-003",
    companyId: "CMP-003",
    contact: "Ravi Kumar",
    email: "ravi@prernatech.com",
    designation: "Procurement Manager",
    phone: "+91 98765 43210",
    type: "Primary",
  },
  {
    id: "CNT-004",
    companyId: "CMP-004",
    contact: "Fatima Omar",
    email: "fatima@rdinfotech.ae",
    designation: "CEO",
    phone: "+971 55 234 5678",
    type: "Secondary",
  },
  {
    id: "CNT-005",
    companyId: "CMP-005",
    contact: "David Wilson",
    email: "david@jkenterprises.ae",
    designation: "Managing Director",
    phone: "+971 56 456 7890",
    type: "Primary",
  },
  {
    id: "CNT-006",
    companyId: "CMP-001",
    contact: "Mohammed Ali",
    email: "mohammed@falcon.ae",
    designation: "Finance Manager",
    phone: "+971 58 123 4567",
    type: "Secondary",
  },
  {
    id: "CNT-007",
    companyId: "CMP-002",
    contact: "Ayesha Khan",
    email: "ayesha@abctechno.ae",
    designation: "HR Manager",
    phone: "+971 54 765 4321",
    type: "Primary",
  },
];

export const initializeContacts = () => {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContacts));
  }
};

export const getContacts = () => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const getContactById = (id) => {
  if (typeof window === "undefined") return null;

  return getContacts().find((item) => item.id === id);
};

export const getContactsByCompanyId = (companyId) => {
  return getContacts().filter((item) => item.companyId === companyId);
};

export const addContact = (contact) => {
  const contacts = getContacts();

  contacts.unshift({
    ...contact,
    id: `CNT-${Date.now()}`,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const updateContact = (id, data) => {
  const contacts = getContacts().map((item) =>
    item.id === id ? { ...item, ...data } : item
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const deleteContact = (id) => {
  const contacts = getContacts().filter((item) => item.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};