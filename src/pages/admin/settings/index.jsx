import PageBanner from "@/components/common/PageBanner";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import { IoChevronDown } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";

import {
  getRolesPermissions,
  updateRolePermission,
  roleHasPermission,
  permissionModules,
} from "@/utils/rolesPermissionsStorage";

const SettingsPage = () => {
  const [selectedRole, setSelectedRole] = useState("manager");
  const [rolesPermissions, setRolesPermissions] = useState({});

  const roles = [
    {
      key: "manager",
      label: "Manager",
    },
    {
      key: "salesRep",
      label: "Sales Rep",
    },
  ];


  useEffect(() => {
    setRolesPermissions(getRolesPermissions());
  }, []);

  const handlePermissionChange = (
    module,
    action,
    checked
  ) => {
    updateRolePermission(
      selectedRole,
      module,
      action,
      checked
    );

    setRolesPermissions(getRolesPermissions());
  };

  const getEnabledCount = (module, actions) => {
    return actions.filter((action) =>
      roleHasPermission(
        selectedRole,
        module,
        action
      )
    ).length;
  };

  const enableAllPermissions = (module, actions) => {
    actions.forEach((action) => {
      updateRolePermission(
        selectedRole,
        module,
        action,
        true
      );
    });

    setRolesPermissions(getRolesPermissions());
  };

  const disableAllPermissions = (module, actions) => {
    actions.forEach((action) => {
      updateRolePermission(
        selectedRole,
        module,
        action,
        false
      );
    });

    setRolesPermissions(getRolesPermissions());
  };

  return (
    <>
      <PageBanner title="Settings" />

      <div className="bg-box roles-permissions-box">
        <div className="table-header">
          <div>
            <h3>Roles & permissions</h3>
            <p>
              Manage access and permissions for each
              user role.
            </p>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              className="table-dropdown btn-outline-primary"
            >
              {
                roles.find(
                  (role) =>
                    role.key === selectedRole
                )?.label
              }
              <IoChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {roles.map((role) => (
                <Dropdown.Item
                  key={role.key}
                  onClick={() =>
                    setSelectedRole(role.key)
                  }
                >
                  {role.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="permission-list">
          <Accordion defaultActiveKey="0">
            {permissionModules?.map((item, index) => {
              const enabledCount =
                getEnabledCount(
                  item.module,
                  item.actions
                );

              const allEnabled =
                enabledCount ===
                item.actions.length;

              return (
                <Accordion.Item
                  eventKey={String(index)}
                  key={item.module}
                >
                  <Accordion.Header>
                    <div className="permission-module-info">
                      <div>
                        <h5>{item.label}</h5>

                        <span>
                          {enabledCount} /{" "}
                          {item.actions.length}{" "}
                          permissions enabled
                        </span>
                      </div>
                    </div>

                    <div
                      className="permission-module-actions"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      <button
                        type="button"
                        className="permission-action-btn"
                        onClick={() =>
                          allEnabled
                            ? disableAllPermissions(
                              item.module,
                              item.actions
                            )
                            : enableAllPermissions(
                              item.module,
                              item.actions
                            )
                        }
                      >
                        {allEnabled
                          ? "Disable all"
                          : "Enable all"}
                      </button>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="permission-module-content">
                      {item.actions.map(
                        (action) => {
                          const checked =
                            roleHasPermission(
                              selectedRole,
                              item.module,
                              action
                            );

                          return (
                            <button
                              type="button"
                              key={action}
                              className={`permission-chip ${checked
                                ? "active"
                                : ""
                                }`}
                              onClick={() =>
                                handlePermissionChange(
                                  item.module,
                                  action,
                                  !checked
                                )
                              }
                            >
                              <span className="permission-chip-icon">
                                {checked ? <FaCheck /> : <FaPlus />}
                              </span>

                              <span>
                                {action
                                  .charAt(0)
                                  .toUpperCase() +
                                  action.slice(1)}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;