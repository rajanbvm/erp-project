const STORAGE_KEY = "notificationsData";

/* =========================================================
   GET NOTIFICATIONS
========================================================= */

export const getNotifications = () => {
    if (typeof window === "undefined") {
        return [];
    }

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};


/* =========================================================
   SAVE NOTIFICATIONS
========================================================= */

const saveNotifications = (notifications) => {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
    );

    window.dispatchEvent(
        new Event("notificationsUpdated")
    );
};


/* =========================================================
   ADD NOTIFICATION
========================================================= */

export const addNotification = (notification) => {

    const notifications = getNotifications();

    const newNotification = {
        id: Date.now(),
        ...notification,
        isRead: false,
        createdAt: new Date().toISOString(),
    };

    notifications.unshift(newNotification);

    saveNotifications(notifications);

    return newNotification;
};


/* =========================================================
   NOTIFICATION: ADDED
========================================================= */

export const notifyAdded = (
    type,
    name,
    recordId = null
) => {

    return addNotification({
        type,
        action: "added",
        recordId,

        title: `New ${type} Added`,

        message:
            `${type} "${name}" was added successfully.`,
    });

};


/* =========================================================
   NOTIFICATION: UPDATED
========================================================= */

export const notifyUpdated = (
    type,
    name,
    recordId = null
) => {

    return addNotification({
        type,
        action: "updated",
        recordId,

        title: `${type} Updated`,

        message:
            `${type} "${name}" was updated successfully.`,
    });

};


/* =========================================================
   NOTIFICATION: DELETED
========================================================= */

export const notifyDeleted = (
    type,
    name,
    recordId = null
) => {

    return addNotification({
        type,
        action: "deleted",
        recordId,

        title: `${type} Deleted`,

        message:
            `${type} "${name}" was deleted successfully.`,
    });

};


/* =========================================================
   REMINDER OVERDUE
========================================================= */

export const notifyReminderOverdue = (
    reminderName,
    recordId = null
) => {

    const notifications =
        getNotifications();

    /*
    |--------------------------------------------------------------------------
    | Prevent duplicate overdue notifications
    |--------------------------------------------------------------------------
    */

    const alreadyExists =
        notifications.some(
            (notification) =>
                notification?.type === "Reminder" &&
                notification?.action === "overdue" &&
                notification?.recordId === recordId
        );

    if (alreadyExists) {
        return null;
    }

    return addNotification({

        type: "Reminder",

        action: "overdue",

        recordId,

        title: "Reminder Overdue",

        message:
            `Reminder "${reminderName}" is overdue.`,

    });

};


/* =========================================================
   MARK AS READ
========================================================= */

export const markNotificationAsRead = (id) => {

    const notifications =
        getNotifications();

    const updatedNotifications =
        notifications.map(
            (notification) =>
                notification?.id === id
                    ? {
                        ...notification,
                        isRead: true,
                    }
                    : notification
        );

    saveNotifications(
        updatedNotifications
    );
};


/* =========================================================
   MARK ALL AS READ
========================================================= */

export const markAllNotificationsAsRead = () => {

    const notifications =
        getNotifications();

    const updatedNotifications =
        notifications.map(
            (notification) => ({
                ...notification,
                isRead: true,
            })
        );

    saveNotifications(
        updatedNotifications
    );
};


/* =========================================================
   DELETE NOTIFICATION
========================================================= */

export const deleteNotification = (id) => {

    const notifications =
        getNotifications();

    const updatedNotifications =
        notifications.filter(
            (notification) =>
                notification?.id !== id
        );

    saveNotifications(
        updatedNotifications
    );
};


/* =========================================================
   CLEAR ALL NOTIFICATIONS
========================================================= */

export const clearAllNotifications = () => {

    saveNotifications([]);

};


/* =========================================================
   GET UNREAD COUNT
========================================================= */

export const getUnreadNotificationCount = () => {

    return getNotifications().filter(
        (notification) =>
            !notification?.isRead
    ).length;

};


/* =========================================================
   GET NOTIFICATION ROUTE
========================================================= */

export const getNotificationRoute = (
    notification
) => {

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


        /*
        |--------------------------------------------------------------------------
        | Reminder
        |--------------------------------------------------------------------------
        |
        | Reminders are generated from Activities.
        | Therefore Reminder notifications should open
        | the Activity Details page.
        |
        */

        case "Reminder":

            return `/admin/activities/view/${notification?.recordId}`;


        default:

            return null;

    }

};