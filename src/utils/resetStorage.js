import { initializeCompanies } from "./companiesStorage";
import { initializeContacts } from "./contactsStorage";
import { initializeLeads } from "./leadsStorage";
import { initializeQuotations } from "./quotationStorage";
import { initializeActivities } from "./activitiesStorage";
import { initializeOpportunities } from "./opportunitiesStorage";
import {
    initializeRolesPermissions,
    initializeUsers,
} from "./rolesPermissionsStorage";
import { initializeProducts } from "./productsStorage";

export const resetERPStorage = () => {
    localStorage.removeItem("companiesData");
    localStorage.removeItem("contactsData");
    localStorage.removeItem("leadsData");
    localStorage.removeItem("quotationData");
    localStorage.removeItem("activitiesData");
    localStorage.removeItem("opportunitiesData");
    localStorage.removeItem("notificationsData");
    localStorage.removeItem("rolesPermissionsData");
    localStorage.removeItem("productsData");

    // Reset users/profile data
    localStorage.removeItem("erpUsers");
    localStorage.removeItem("currentUser");

    initializeCompanies();
    initializeContacts();
    initializeLeads();
    initializeQuotations();
    initializeActivities();
    initializeOpportunities();
    initializeRolesPermissions();
    initializeUsers();
    initializeProducts();

    window.location.reload();
};