const USERS_STORAGE_KEY = "erpUsers";

export const defaultUsers = [
    {
        id: "USR-001",
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
        isActive: true,
    },
    {
        id: "USR-002",
        name: "Manager",
        email: "manager@gmail.com",
        password: "123456",
        role: "manager",
        isActive: true,
    },
    {
        id: "USR-003",
        name: "Sales Representative",
        email: "sales@gmail.com",
        password: "123456",
        role: "salesRep",
        isActive: true,
    },
];

const STORAGE_KEY = "rolesPermissionsData";

const defaultRolesPermissions = {
    admin: {
        dashboard: ["view"],

        leads: ["view", "create", "edit", "delete", "export"],
        companies: ["view", "create", "edit", "delete", "export"],
        contacts: ["view", "create", "edit", "delete", "export"],
        opportunities: ["view", "create", "edit", "delete", "export"],
        quotations: ["view", "create", "edit", "delete", "export"],
        activities: ["view", "create", "edit", "delete", "export"],
        reminders: ["view", "create", "edit", "delete"],
        notifications: ["view", "edit"],

        teamUsers: ["view", "create", "edit", "delete"],
        rolesPermissions: ["view", "create", "edit", "delete"],
        settings: ["view", "create", "edit", "delete"],
    },

    manager: {
        dashboard: ["view"],

        leads: ["view", "create", "edit", "delete", "export"],
        companies: ["view", "create", "edit", "export"],
        contacts: ["view", "create", "edit", "export"],
        opportunities: ["view", "create", "edit", "delete", "export"],
        quotations: ["view", "create", "edit", "export"],
        activities: ["view", "create", "edit", "delete"],
        reminders: ["view", "create", "edit", "delete"],
        notifications: ["view"],

        teamUsers: ["view"],
        rolesPermissions: ["view"],
        settings: ["view"],
    },

    salesRep: {
        dashboard: ["view"],

        leads: ["view", "create", "edit"],
        companies: ["view", "create"],
        contacts: ["view", "create", "edit"],
        opportunities: ["view", "create", "edit"],
        quotations: ["view", "create", "edit"],
        activities: ["view", "create", "edit"],
        reminders: ["view", "create", "edit"],
        notifications: ["view"],

        teamUsers: [],
        rolesPermissions: [],
        settings: [],
    },
};

export const permissionModules = [
    {
        module: "leads",
        label: "Leads",
        actions: ["view", "create", "edit", "delete", "export"],
    },
    {
        module: "companies",
        label: "Companies",
        actions: ["view", "create", "edit", "delete", "export"],
    },
    {
        module: "contacts",
        label: "Contacts",
        actions: ["view", "create", "edit", "delete", "export"],
    },
    {
        module: "opportunities",
        label: "Opportunities",
        actions: ["view", "create", "edit", "delete", "export"],
    },
    {
        module: "quotations",
        label: "Quotations",
        actions: ["view", "create", "edit", "delete", "export"],
    },
    {
        module: "activities",
        label: "Activities",
        actions: ["view", "create", "edit", "delete", "export"],
    },
    {
        module: "reminders",
        label: "Reminders",
        actions: ["view", "create", "edit", "delete"],
    },
    {
        module: "notifications",
        label: "Notifications",
        actions: ["view", "edit"],
    },
    // {
    //     module: "teamUsers",
    //     label: "Team & Users",
    //     actions: ["view", "create", "edit", "delete"],
    // },
    // {
    //     module: "rolesPermissions",
    //     label: "Roles & Permissions",
    //     actions: ["view", "create", "edit", "delete"],
    // },
    // {
    //     module: "settings",
    //     label: "Settings",
    //     actions: ["view", "create", "edit", "delete"],
    // },
];

export const initializeRolesPermissions = () => {
    if (typeof window === "undefined") return;

    const existingData = localStorage.getItem(STORAGE_KEY);

    if (!existingData) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultRolesPermissions)
        );
    }
};

export const getRolesPermissions = () => {
    if (typeof window === "undefined") return {};

    initializeRolesPermissions();

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : {};
};

export const hasPermission = (module, action) => {
    if (typeof window === "undefined") {
        return false;
    }

    const user = getCurrentUser();

    if (!user?.isLoggedIn || !user?.role) {
        return false;
    }

    const rolesPermissions = getRolesPermissions();

    const rolePermissions =
        rolesPermissions[user.role];

    if (!rolePermissions) {
        return false;
    }

    const modulePermissions =
        rolePermissions[module];

    if (!modulePermissions) {
        return false;
    }

    return modulePermissions.includes(action);
};

export const updateRolePermission = (role, module, action, enabled) => {
    if (typeof window === "undefined") return;

    const rolesPermissions = getRolesPermissions();

    if (!rolesPermissions[role]) {
        return;
    }

    if (!rolesPermissions[role][module]) {
        rolesPermissions[role][module] = [];
    }

    const permissions = rolesPermissions[role][module];

    if (enabled) {
        // Add permission if it doesn't already exist
        if (!permissions.includes(action)) {
            permissions.push(action);
        }
    } else {
        // Remove permission
        rolesPermissions[role][module] = permissions.filter(
            (permission) => permission !== action
        );
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(rolesPermissions)
    );
};

export const roleHasPermission = (role, module, action) => {
    const rolesPermissions = getRolesPermissions();

    return (
        rolesPermissions?.[role]?.[module]?.includes(action) || false
    );
};

export const initializeUsers = () => {
    if (typeof window === "undefined") return;

    const existingUsers =
        localStorage.getItem(USERS_STORAGE_KEY);

    if (!existingUsers) {
        localStorage.setItem(
            USERS_STORAGE_KEY,
            JSON.stringify(defaultUsers)
        );
    }
};

export const getUsers = () => {
    if (typeof window === "undefined") return [];

    initializeUsers();

    const data =
        localStorage.getItem(USERS_STORAGE_KEY);

    return data ? JSON.parse(data) : [];
};

export const loginUser = (email, password) => {
    if (typeof window === "undefined") {
        return null;
    }

    const users = getUsers();

    const user = users.find(
        (item) =>
            item.email === email &&
            item.password === password &&
            item.isActive
    );

    if (!user) {
        return null;
    }

    const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isLoggedIn: true,
    };

    localStorage.setItem(
        "currentUser",
        JSON.stringify(loggedInUser)
    );

    return loggedInUser;
};

export const getCurrentUser = () => {
    if (typeof window === "undefined") {
        return null;
    }

    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        return null;
    }

    try {
        return JSON.parse(currentUser);
    } catch (error) {
        localStorage.removeItem("currentUser");
        return null;
    }
};

export const logoutUser = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("currentUser");
};