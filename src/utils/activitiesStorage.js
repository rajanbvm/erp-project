const STORAGE_KEY = "activitiesData";

const defaultActivities = [
    {
        id: "ACT-001",
        taskTitle: "Product Demo & Pricing Discussion",
        assignee: "John Doe",
        dueDate: "2026-08-15",
        dueTime: "11:00",
        type: "Meeting",
        relatedTo: "CMP-001",
        status: "Scheduled",
        createdAt: "2026-08-14T09:00:00",
    },
    {
        id: "ACT-002",
        taskTitle: "Follow up with client",
        assignee: "Jane Smith",
        dueDate: "2026-08-16",
        dueTime: "14:30",
        type: "Phone",
        relatedTo: "CMP-002",
        status: "Scheduled",
        createdAt: "2026-08-14T10:00:00",
    },
];

/*
|--------------------------------------------------------------------------
| Initialize Activities
|--------------------------------------------------------------------------
*/

export const initializeActivities = () => {
    if (typeof window === "undefined") return;

    const existingData = localStorage.getItem(STORAGE_KEY);

    if (!existingData) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultActivities)
        );
    }
};

/*
|--------------------------------------------------------------------------
| Get Activities
|--------------------------------------------------------------------------
*/

export const getActivities = () => {
    if (typeof window === "undefined") return [];

    try {
        const data = localStorage.getItem(STORAGE_KEY);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error getting activities:", error);
        return [];
    }
};

/*
|--------------------------------------------------------------------------
| Get Activity By ID
|--------------------------------------------------------------------------
*/

export const getActivityById = (id) => {
    const activities = getActivities();

    return activities.find(
        (activity) => activity?.id === id
    );
};

/*
|--------------------------------------------------------------------------
| Generate Activity ID
|--------------------------------------------------------------------------
*/

const generateActivityId = () => {
    const activities = getActivities();

    if (!activities.length) {
        return "ACT-001";
    }

    const numbers = activities
        .map((activity) => {
            const number = parseInt(
                activity?.id?.replace("ACT-", ""),
                10
            );

            return isNaN(number) ? 0 : number;
        })
        .filter(Boolean);

    const nextNumber =
        Math.max(...numbers, 0) + 1;

    return `ACT-${String(nextNumber).padStart(3, "0")}`;
};

/*
|--------------------------------------------------------------------------
| Add Activity
|--------------------------------------------------------------------------
*/

export const addActivity = (activityData) => {
    const activities = getActivities();

    const newActivity = {
        ...activityData,

        id: generateActivityId(),

        createdAt:
            activityData?.createdAt ||
            new Date().toISOString(),
    };

    const updatedActivities = [
        ...activities,
        newActivity,
    ];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedActivities)
    );

    return newActivity;
};

/*
|--------------------------------------------------------------------------
| Update Activity
|--------------------------------------------------------------------------
*/

export const updateActivity = (id, updatedData) => {
    const activities = getActivities();

    const updatedActivities = activities.map(
        (activity) => {

            if (activity?.id !== id) {
                return activity;
            }

            return {
                ...activity,
                ...updatedData,
                id: activity?.id,
            };
        }
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedActivities)
    );

    return updatedActivities.find(
        (activity) => activity?.id === id
    );
};

/*
|--------------------------------------------------------------------------
| Delete Activity
|--------------------------------------------------------------------------
*/

export const deleteActivity = (id) => {
    const activities = getActivities();

    const updatedActivities = activities.filter(
        (activity) => activity?.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedActivities)
    );

    return updatedActivities;
};

/*
|--------------------------------------------------------------------------
| Get Scheduled Reminders
|
| Reminders are NOT stored separately.
| They are generated from activitiesData.
|--------------------------------------------------------------------------
*/

export const getReminders = () => {
    const activities = getActivities();

    return activities
        .filter((activity) => {

            if (!activity?.dueDate) {
                return false;
            }

            if (
                activity?.status &&
                activity?.status !== "Scheduled"
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {

            const dateA = new Date(
                `${a?.dueDate}T${a?.dueTime || "00:00"}`
            );

            const dateB = new Date(
                `${b?.dueDate}T${b?.dueTime || "00:00"}`
            );

            return dateA - dateB;
        });
};

/*
|--------------------------------------------------------------------------
| Get Upcoming Reminders
|--------------------------------------------------------------------------
*/

export const getUpcomingReminders = () => {
    const now = new Date();

    return getReminders().filter((activity) => {

        const activityDate = new Date(
            `${activity?.dueDate}T${activity?.dueTime || "00:00"}`
        );

        return activityDate >= now;
    });
};

/*
|--------------------------------------------------------------------------
| Get Overdue Reminders
|--------------------------------------------------------------------------
*/

export const getOverdueReminders = () => {
    const now = new Date();

    return getReminders().filter((activity) => {

        const activityDate = new Date(
            `${activity?.dueDate}T${activity?.dueTime || "00:00"}`
        );

        return activityDate < now;
    });
};