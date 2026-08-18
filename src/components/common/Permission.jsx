import React from "react";
import { hasPermission } from "@/utils/rolesPermissionsStorage";

const Permission = ({ module, action, children }) => {

    const allowed = hasPermission(module, action);

    if (!allowed) {
        return null;
    }

    return children;
};

export default Permission;