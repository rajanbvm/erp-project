import { initializeCompanies } from "./companiesStorage";
import { initializeContacts } from "./contactsStorage";
import { initializeLeads } from "./leadsStorage";
import { initializeQuotations } from "./quotationStorage";
import { initializeActivities } from "./activitiesStorage";

export const resetERPStorage = () => {
    localStorage.removeItem("companiesData");
    localStorage.removeItem("contactsData");
    localStorage.removeItem("leadsData");
    localStorage.removeItem("quotationData");
    localStorage.removeItem("activitiesData");

    initializeCompanies();
    initializeContacts();
    initializeLeads();
    initializeQuotations();
    initializeActivities();

    window.location.reload();
};