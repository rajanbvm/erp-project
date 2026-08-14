import { addNotification } from "./notificationsStorage";

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