const STORAGE_KEY = "activitiesData";

const defaultActivities = [
    {
        id: "ACT-001",
        taskTitle: "CRM Software Deployment",
        assignee: "John Doe",
        dueDate: "2026-08-15",
        type: "Phone",
        relatedTo: "CMP-001",
        status: "Scheduled",
    },
    {
        id: "ACT-002",
        taskTitle: "Follow up with client",
        assignee: "Sarah Wilson",
        dueDate: "2026-08-18",
        type: "Email",
        relatedTo: "CMP-002",
        status: "Pending",
    },
];

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

export const getActivities = () => {
    if (typeof window === "undefined") return [];

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};

export const getActivityById = (id) => {
    const activities = getActivities();

    return activities.find(
        (activity) => activity?.id === id
    );
};

export const addActivity = (activityData) => {
    const activities = getActivities();

    const newActivity = {
        ...activityData,
        id: `ACT-${String(activities.length + 1).padStart(3, "0")}`,
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

export const updateActivity = (id, activityData) => {
    const activities = getActivities();

    const updatedActivities = activities.map((activity) =>
        activity?.id === id
            ? {
                  ...activity,
                  ...activityData,
              }
            : activity
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedActivities)
    );

    return updatedActivities;
};

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