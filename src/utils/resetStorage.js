import { initializeCompanies } from "./companiesStorage";
import { initializeContacts } from "./contactsStorage";
import { initializeLeads } from "./leadsStorage";
import { initializeQuotations } from "./quotationStorage";
import { initializeActivities } from "./activitiesStorage";
import { initializeOpportunities } from "./opportunitiesStorage";
// import { initializeNotifications } from "./notificationsStorage";

export const resetERPStorage = () => {
    localStorage.removeItem("companiesData");
    localStorage.removeItem("contactsData");
    localStorage.removeItem("leadsData");
    localStorage.removeItem("quotationData");
    localStorage.removeItem("activitiesData");
    localStorage.removeItem("opportunitiesData");
    localStorage.removeItem("notificationsData");

    initializeCompanies();
    initializeContacts();
    initializeLeads();
    initializeQuotations();
    initializeActivities();
    initializeOpportunities();
    // initializeNotifications();

    window.location.reload();
};