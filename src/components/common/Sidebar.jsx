import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import CloseModal from "@/images/CloseModal.svg";
import { resetERPStorage } from "@/utils/resetStorage";
import { Form, Modal } from "react-bootstrap";
import AdminNavbar from "./navbars/admin-navbar";
import DP from "@/images/Dp.png";

import {
  getCurrentUser,
} from "@/utils/rolesPermissionsStorage";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getNotificationRoute,
} from "@/utils/notificationsStorage";

import {
  BsBell,
  BsSearch,
  BsSliders2,
} from "react-icons/bs";

const Sidebar = () => {
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTab, setNotificationTab] = useState("all");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
  const loadUser = () => {
    setCurrentUser(getCurrentUser());
  };

  loadUser();

  const handleProfileUpdated = () => {
    loadUser();
  };

  window.addEventListener(
    "profileUpdated",
    handleProfileUpdated
  );

  return () => {
    window.removeEventListener(
      "profileUpdated",
      handleProfileUpdated
    );
  };
}, []);

  useEffect(() => {
    if (showNotifications) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showNotifications]);

  useEffect(() => {
    const loadNotifications = () => {
      setNotifications(getNotifications());
    };

    loadNotifications();

    window.addEventListener(
      "notificationsUpdated",
      loadNotifications
    );

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        loadNotifications
      );
    };
  }, []);

  const unreadCount = notifications?.filter(
    (notification) => !notification?.isRead
  ).length;

  const filteredNotifications =
    notificationTab === "unread"
      ? notifications?.filter(
        (notification) => !notification?.isRead
      )
      : notifications;

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification?.id);

    setShowNotifications(false);

    const route = getNotificationRoute(notification);

    if (route) {
      router.push(route);
    }
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0) {
      return;
    }

    markAllNotificationsAsRead();
  };

  return (
    <>
      <AdminNavbar />

      <div className="dash-header">
        <div className="header-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
            />

            <span className="search-icon">
              <BsSearch />
            </span>
          </div>

          <div className="header-actions">
            <span
              className="settings-icon"
              onClick={resetERPStorage}
              style={{ cursor: "pointer" }}
            >
              <BsSliders2 />
            </span>

            <div className="notification-wrapper">
              <span
                className="settings-icon"
                onClick={() =>
                  setShowNotifications((prev) => !prev)
                }
                style={{ cursor: "pointer" }}
              >
                <BsBell />
              </span>

              <span className="notification-count">
                {unreadCount}
              </span>

              {showNotifications && (
                <div
                  className="notification-modal-overlay"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  <div
                    className="notificationModalcontent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          All Notifications
                        </h5>

                        <button
                          type="button"
                          className="btn-close"
                          onClick={() =>
                            setShowNotifications(
                              false
                            )
                          }
                          aria-label="Close"
                        />
                      </div>

                      <div className="modal-body">
                        <div className="d-flex align-items-center">
                          <div className="notification_tabs w-50">
                            <button
                              type="button"
                              className={`btn ${notificationTab ===
                                  "all"
                                  ? "active"
                                  : ""
                                }`}
                              onClick={() =>
                                setNotificationTab(
                                  "all"
                                )
                              }
                            >
                              All
                            </button>

                            <button
                              type="button"
                              className={`btn ${notificationTab ===
                                  "unread"
                                  ? "active"
                                  : ""
                                }`}
                              onClick={() =>
                                setNotificationTab(
                                  "unread"
                                )
                              }
                            >
                              Unread (
                              {unreadCount})
                            </button>
                          </div>

                          <div className="notification_tabs w-50">
                            <button
                              type="button"
                              className="btn btn-outline-primary markAllRead ms-auto"
                              onClick={
                                handleMarkAllAsRead
                              }
                              disabled={
                                unreadCount ===
                                0
                              }
                            >
                              Mark all as read
                            </button>
                          </div>
                        </div>

                        <div className="notification_listing">
                          {filteredNotifications?.length ===
                            0 ? (
                            <div className="no-notifications">
                              <BsBell />

                              <p className="mb-0">
                                {notificationTab ===
                                  "unread"
                                  ? "No unread notifications"
                                  : "No notifications yet"}
                              </p>
                            </div>
                          ) : (
                            filteredNotifications?.map(
                              (notification) => (
                                <div
                                  key={
                                    notification?.id
                                  }
                                  className={`notification-list-item ${notification?.isRead
                                      ? "read-notification"
                                      : ""
                                    }`}
                                  onClick={() =>
                                    handleNotificationClick(
                                      notification
                                    )
                                  }
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <h5>
                                    {
                                      notification?.title
                                    }
                                  </h5>

                                  <p className="mb-0">
                                    {
                                      notification?.message
                                    }
                                  </p>

                                  <small>
                                    {notification?.createdAt
                                      ? new Date(
                                        notification?.createdAt
                                      ).toLocaleTimeString(
                                        [],
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        }
                                      )
                                      : ""}
                                  </small>
                                </div>
                              )
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span className="theme-icon">
              <Form.Check
                type="switch"
                id="theme-switch"
                checked={darkMode}
                onChange={(e) =>
                  setDarkMode(e.target.checked)
                }
              />
            </span>

            <span
              className="settings-icon"
              style={{ cursor: "pointer" }}
              onClick={() => router?.push("/admin/profile")}
            >
              <li className="nav-profile mb-0">
                <Image
                  src={currentUser?.profileImage || DP}
                  alt="Profile Image"
                  width={40}
                  height={40}
                />
              </li>
            </span>
          </div>
        </div>
      </div>

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Body className="logout-modal">
          <button
            className="close-modal-btn"
            onClick={() => setShowLogoutModal(false)}
          >
            <Image
              src={CloseModal}
              alt="close"
            />
          </button>

          <h5>Logout</h5>

          <p className="w-75 mx-auto">
            Are you sure you want to logout?
          </p>

          <div className="logout-footer">
            <button
              className="btn-primary br-30"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>

            <button
              className="btn-outline-secondary"
              onClick={() => {
                alert("Logout Successfully");
                setShowLogoutModal(false);
              }}
            >
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Sidebar;