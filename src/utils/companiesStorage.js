const STORAGE_KEY = "companiesData";

const defaultCompanies = [
  {
    id: "CMP-001",
    company: "Falcon Group LLC",
    industry: "Real Estate",
    location: "Dubai, UAE",
    deals: "2",
    revenue: "$120K",
    owner: "John Doe",

    phone: "+971 4 222 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 employees",
    gstin: "08AAACF1234M1Z9",

    billingAddress: "14th Floor, Falcon Tower, Jaipur",


    notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: "CMP-002",
    company: "ABC Techno",
    industry: "IT & Software",
    location: "Fujairah, UAE",
    deals: "4",
    revenue: "$140K",
    owner: "Sarah Wilson",

    phone: "+971 4 222 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 employees",
    gstin: "08AAACF1234M1Z9",

    billingAddress: "14th Floor, Falcon Tower, Jaipur",


    notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: "CMP-003",
    company: "Prerna Tech",
    industry: "Retail",
    location: "Sharjah, UAE",
    deals: "4",
    revenue: "$160K",
    owner: "Mike Johnson",

    phone: "+971 4 222 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 employees",
    gstin: "08AAACF1234M1Z9",

    billingAddress: "14th Floor, Falcon Tower, Jaipur",


    notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: "CMP-004",
    company: "RD Infotech",
    industry: "Manufacturing",
    location: "Ajman, UAE",
    deals: "4",
    revenue: "$180K",
    owner: "Tom Jane",

    phone: "+971 4 222 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 employees",
    gstin: "08AAACF1234M1Z9",

    billingAddress: "14th Floor, Falcon Tower, Jaipur",


    notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    id: "CMP-005",
    company: "JK Enterprises",
    industry: "Construction",
    location: "Ras Al Khaimah, UAE",
    deals: "4",
    revenue: "$200K",
    owner: "G.I. Shmoe",

    phone: "+971 4 222 0000",
    email: "ahmed@falcon.ae",
    website: "www.falcongroup.com",

    companySize: "51 - 200 employees",
    gstin: "08AAACF1234M1Z9",

    billingAddress: "14th Floor, Falcon Tower, Jaipur",


    notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
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

  companies.unshift({
    ...company,
    id: `CMP-${Date.now()}`,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
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