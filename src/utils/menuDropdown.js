export const companySizeOptions = [
    "1 - 10 Employees",
    "11 - 50 Employees",
    "51 - 200 Employees",
    "201 - 500 Employees",
    "501 - 1000 Employees",
    "1000+ Employees",
];

export const budgetOptions = [
    "Below $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "Above $100,000",
];

export const industryOptions = [
    "IT & Software",
    "Retail",
    "Manufacturing",
    "Construction",
    "Healthcare",
    "Education",
    "Finance",
    "Real Estate",
    "Hospitality",
    "Logistics",
    "Telecommunications",
    "Automobile",
];

export const communicationOptions = [
    "Phone",
    "WhatsApp",
    "Email",
    "SMS",
    "Video Call",
];

export const statusOptions = [
    "Qualified",
    "Proposal Sent",
    "Contacted",
    "New",
    "Negotiation",
    "Won",
];

export const sourceOptions = [
    "Website",
    "Google Ads",
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Referral",
    "Email Campaign",
    // "Cold Call",
    // "Trade Show",
    // "Walk-in",
    // "Existing Customer",
    // "Other",
];

export const ownerOptions = [
    "John Doe",
    "Sarah Wilson",
    "Mike Johnson",
    "Priya Rajan",
    "Rajan Dhuria",
];

export const assignmentModeOptions = [
    "Manual",
    "Automatic",
];

export const priorityOptions = [
    "Low",
    "Medium",
    "High",
    "Urgent",
];

export const discountOptions = [
    { label: "0%", value: "0" },
    { label: "5%", value: "5" },
    { label: "10%", value: "10" },
    { label: "15%", value: "15" },
];

export const vatOptions = [
    { label: "0%", value: "0" },
    { label: "5%", value: "5" },
    { label: "10%", value: "10" },
    { label: "15%", value: "15" },
];

export const followUpTypeOptions = [
    "Phone Call",
    "WhatsApp",
    "Email",
    "Video Meeting",
    "Office Meeting",
    "Site Visit",
];

export const scoreOptions = [
    { label: "90 - 100 (Hot)", value: "95" },
    { label: "80 - 85 (High)", value: "80" },
    { label: "60 - 75 (Medium)", value: "65" },
    { label: "40 - 55 (Low)", value: "50" },
    { label: "0 - 35 (Cold)", value: "25" },
];

export const timeOptions = Array.from({ length: 21 }, (_, i) => {
    const totalMinutes = 9 * 60 + i * 30;

    const hour24 = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    const hour12 =
        hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;

    const ampm = hour24 >= 12 ? "PM" : "AM";

    return {
        label: `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`,
        value: `${hour24.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`,
    };
});

export const contactTypeOptions = [
    "Primary",
    "Secondary",
    "Decision Maker",
    "Assistant",
];

export const activityStatusOptions = [
    "Scheduled",
    "Pending",
    "Completed",
    "Overdue",
];