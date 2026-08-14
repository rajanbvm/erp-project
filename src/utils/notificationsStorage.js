const STORAGE_KEY = "notificationsData";

const defaultNotifications = [];

const generateNotificationId = () => {
    const notifications = getNotifications();

    return `NOT-${String(notifications.length + 1).padStart(3, "0")}`;
};

export const initializeNotifications = () => {
    if (typeof window === "undefined") return;

    const existingData = localStorage.getItem(STORAGE_KEY);

    if (!existingData) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultNotifications)
        );
    }
};

export const getNotifications = () => {
    if (typeof window === "undefined") return [];

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};

export const addNotification = ({
    type,
    action,
    title,
    message,
    recordId = null,
}) => {
    if (typeof window === "undefined") return;

    const notifications = getNotifications();

    const newNotification = {
        id: generateNotificationId(),
        type,
        action,
        title,
        message,
        recordId,
        isRead: false,
        createdAt: new Date().toISOString(),
    };

    notifications.unshift(newNotification);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
    );

    // Notify other components immediately
    window.dispatchEvent(new Event("notificationsUpdated"));

    return newNotification;
};

export const markNotificationAsRead = (notificationId) => {
    const notifications = getNotifications();

    const updatedNotifications = notifications.map((notification) =>
        notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(new Event("notificationsUpdated"));
};

export const markAllNotificationsAsRead = () => {
    const notifications = getNotifications();

    const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        isRead: true,
    }));

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(new Event("notificationsUpdated"));
};

export const deleteNotification = (notificationId) => {
    const notifications = getNotifications();

    const updatedNotifications = notifications.filter(
        (notification) => notification.id !== notificationId
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedNotifications)
    );

    window.dispatchEvent(new Event("notificationsUpdated"));
};

export const clearNotifications = () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([])
    );

    window.dispatchEvent(new Event("notificationsUpdated"));
};

export const getUnreadNotificationCount = () => {
    const notifications = getNotifications();

    return notifications.filter(
        (notification) => !notification.isRead
    ).length;
};