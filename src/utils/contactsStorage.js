const STORAGE_KEY = "contactsData";

const defaultContacts = [
  {
    id: "CNT-001",
    companyId: "CMP-001",

    contact: "Ahmed Hassan",
    designation: "Sales Director",
    department: "Sales",

    email: "ahmed@falcon.ae",
    phone: "+971 50 123 4567",
    preferredCommunication: "WhatsApp",

    reportingManager: "John Doe",

    isPrimary: true,
    type: "Primary",

    street: "14th Floor, Falcon Tower",
    city: "Dubai",
    state: "Dubai",
    pincode: "00000",
    country: "UAE",
  },

  {
    id: "CNT-002",
    companyId: "CMP-002",

    contact: "Sara Mehta",
    designation: "CTO",
    department: "Technology",

    email: "sara@abctechno.ae",
    phone: "+971 52 987 6543",
    preferredCommunication: "Email",

    reportingManager: "Sarah Wilson",

    isPrimary: false,
    type: "Secondary",

    street: "Business Bay",
    city: "Dubai",
    state: "Dubai",
    pincode: "00000",
    country: "UAE",
  },

  {
    id: "CNT-003",
    companyId: "CMP-003",

    contact: "Ravi Kumar",
    designation: "Procurement Manager",
    department: "Procurement",

    email: "ravi@prernatech.com",
    phone: "+91 98765 43210",
    preferredCommunication: "Phone",

    reportingManager: "Mike Johnson",

    isPrimary: true,
    type: "Primary",

    street: "Tech Park Road",
    city: "Sharjah",
    state: "Sharjah",
    pincode: "00000",
    country: "UAE",
  },

  {
    id: "CNT-004",
    companyId: "CMP-004",

    contact: "Fatima Omar",
    designation: "CEO",
    department: "Management",

    email: "fatima@rdinfotech.ae",
    phone: "+971 55 234 5678",
    preferredCommunication: "Email",

    reportingManager: "Tom Jane",

    isPrimary: false,
    type: "Secondary",

    street: "Industrial Area",
    city: "Ajman",
    state: "Ajman",
    pincode: "00000",
    country: "UAE",
  },

  {
    id: "CNT-005",
    companyId: "CMP-005",

    contact: "David Wilson",
    designation: "Managing Director",
    department: "Management",

    email: "david@jkenterprises.ae",
    phone: "+971 56 456 7890",
    preferredCommunication: "WhatsApp",

    reportingManager: "G.I. Shmoe",

    isPrimary: true,
    type: "Primary",

    country: "AE",
    state: "DU",
    city: "Dubai",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",
  },

  {
    id: "CNT-006",
    companyId: "CMP-001",

    contact: "Mohammed Ali",
    designation: "Finance Manager",
    department: "Finance",

    email: "mohammed@falcon.ae",
    phone: "+971 58 123 4567",
    preferredCommunication: "Phone",

    reportingManager: "John Doe",

    isPrimary: false,
    type: "Secondary",

    country: "AE",
    state: "DU",
    city: "Dubai",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",
  },

  {
    id: "CNT-007",
    companyId: "CMP-002",

    contact: "Ayesha Khan",
    designation: "HR Manager",
    department: "Human Resources",

    email: "ayesha@abctechno.ae",
    phone: "+971 54 765 4321",
    preferredCommunication: "WhatsApp",

    reportingManager: "Sarah Wilson",

    isPrimary: true,
    type: "Primary",

    country: "AE",
    state: "DU",
    city: "Dubai",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",
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