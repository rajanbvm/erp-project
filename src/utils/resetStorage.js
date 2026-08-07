import { initializeCompanies } from "./companiesStorage";
import { initializeContacts } from "./contactsStorage";
import { initializeLeads } from "./leadsStorage";
import { initializeQuotations } from "./quotationStorage";

export const resetERPStorage = () => {
    localStorage.removeItem("companiesData");
    localStorage.removeItem("contactsData");
    localStorage.removeItem("leadsData");
    localStorage.removeItem("quotationData");

    initializeCompanies();
    initializeContacts();
    initializeLeads();
    initializeQuotations();

    window.location.reload();
};