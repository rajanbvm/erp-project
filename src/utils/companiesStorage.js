const STORAGE_KEY = "companiesData";

const defaultCompanies = [
  {
    id: "CMP-001",
    company: "Falcon Group LLC",
    industry: "Real Estate",
    deals: "2",
    revenue: "$120K",
    owner: "John Doe",

    phone: "+971 4 222 0000",
    alternatePhone: "+123 456 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 Employees",
    gstin: "08AAACF1234M1Z9",
    panNo: "AAACF1234",

    country: "AE",
    state: "DU",
    city: "Dubai",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",

    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    id: "CMP-002",
    company: "ABC Techno",
    industry: "IT & Software",
    deals: "4",
    revenue: "$140K",
    owner: "Sarah Wilson",

    phone: "+971 4 222 0000",
    alternatePhone: "+123 456 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 Employees",
    gstin: "08AAACF1234M1Z9",

    country: "AE",
    state: "FU",
    city: "Fujairah",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",

    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    id: "CMP-003",
    company: "Prerna Tech",
    industry: "Retail",
    deals: "4",
    revenue: "$160K",
    owner: "Mike Johnson",

    phone: "+971 4 222 0000",
    alternatePhone: "+123 456 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 Employees",
    gstin: "08AAACF1234M1Z9",

    country: "AE",
    state: "SH",
    city: "Sharjah",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",

    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    id: "CMP-004",
    company: "RD Infotech",
    industry: "Manufacturing",
    deals: "4",
    revenue: "$180K",
    owner: "Tom Jane",

    phone: "+971 4 222 0000",
    alternatePhone: "+123 456 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 Employees",
    gstin: "08AAACF1234M1Z9",

    country: "AE",
    state: "AJ",
    city: "Ajman",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",

    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  {
    id: "CMP-005",
    company: "JK Enterprises",
    industry: "Construction",
    deals: "4",
    revenue: "$200K",
    owner: "G.I. Shmoe",

    phone: "+971 4 222 0000",
    alternatePhone: "+123 456 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 Employees",
    gstin: "08AAACF1234M1Z9",

    country: "AE",
    state: "RK",
    city: "Ras Al Khaimah",
    pincode: "00000",
    street: "14th Floor, Falcon Tower",

    notes:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export const initializeCompanies = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCompanies));
  }
};

export const getCompanies = () => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const getCompanyById = (id) => {
  return getCompanies().find((item) => item.id === id);
};

export const addCompany = (company) => {
    const companies = getCompanies();

    const newCompany = {
        ...company,
        id: generateCompanyId(companies),
    };

    const updatedCompanies = [
        ...companies,
        newCompany,
    ];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCompanies)
    );

    return newCompany;
};

export const updateCompany = (id, data) => {
  const companies = getCompanies().map((item) =>
    item.id === id ? { ...item, ...data } : item
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
};

export const deleteCompany = (id) => {
  const companies = getCompanies().filter((item) => item.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
}; 

const generateCompanyId = (companies) => {
  if (!companies.length) {
    return "CMP-001";
  }

  const numbers = companies
    .map((company) => {
      const match = company?.id?.match(/CMP-(\d+)/);

      return match ? parseInt(match[1], 10) : 0;
    })
    .filter(Boolean);

  const nextNumber =
    numbers.length > 0
      ? Math.max(...numbers) + 1
      : 1;

  return `CMP-${String(nextNumber).padStart(3, "0")}`;
};