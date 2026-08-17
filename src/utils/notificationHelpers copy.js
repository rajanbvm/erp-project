import { addNotification, getNotifications, } from "@/utils/notificationsStorage";


export const notifyAdded = (type, name, recordId = null) => {
    addNotification({
        type,
        action: "added",
        title: `New ${type} Added`,
        message: `${type} "${name}" was added successfully.`,
        recordId,
    });
};

export const notifyUpdated = (type, name, recordId = null) => {
    addNotification({
        type,
        action: "updated",
        title: `${type} Updated`,
        message: `${type} "${name}" was updated successfully.`,
        recordId,
    });
};

export const notifyDeleted = (type, name, recordId = null) => {
    addNotification({
        type,
        action: "deleted",
        title: `${type} Deleted`,
        message: `${type} "${name}" was deleted successfully.`,
        recordId,
    });
};

export const notifyReminderOverdue = (
    reminderName,
    recordId = null
) => {
    const notifications = getNotifications();

    const alreadyExists = notifications.some(
        (notification) =>
            notification?.type === "Reminder" &&
            notification?.action === "overdue" &&
            notification?.recordId === recordId
    );

    if (alreadyExists) {
        return;
    }

    addNotification({
        type: "Reminder",
        action: "overdue",
        title: "Reminder Overdue",
        message: `Reminder "${reminderName}" is overdue.`,
        recordId,
    });
};

export const getNotificationRoute = (notification) => {
    if (!notification?.recordId) {
        return null;
    }

    switch (notification?.type) {
        case "Lead":
            return `/admin/leads/view/${notification?.recordId}`;

        case "Quotation":
            return `/admin/quotations/view/${notification?.recordId}`;

        case "Company":
            return `/admin/companies/view/${notification?.recordId}`;

        case "Contact":
            return `/admin/contacts/view/${notification?.recordId}`;

        case "Opportunity":
            return `/admin/opportunities/view/${notification?.recordId}`;

        case "Activity":
            return `/admin/activities/view/${notification?.recordId}`;

        default:
            return null;
    }
};