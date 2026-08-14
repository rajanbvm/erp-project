
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import CloseModal from "@/images/CloseModal.svg";
import { resetERPStorage } from "@/utils/resetStorage";
import { Form, Modal } from "react-bootstrap";
import AdminNavbar from "./navbars/admin-navbar";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/utils/notificationsStorage";
import { BsBell, BsSearch, BsSliders2 } from "react-icons/bs";

const Sidebar = () => {

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationTab, setNotificationTab] = useState("all");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

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

  const filteredNotifications =
    notificationTab === "unread"
      ? notifications?.filter(
        (notification) => !notification.isRead
      )
      : notifications;

  return (
    <>
      {/* Sidebar */}
      <AdminNavbar />

      {/* Header */}
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
                onClick={() => setShowNotifications((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                <BsBell />
              </span>

              <span className="notification-count">
                {
                  notifications?.filter(
                    (notification) => !notification.isRead
                  ).length
                }
              </span>

              {showNotifications && (
                <div
                  className="notification-modal-overlay"
                  onClick={() => setShowNotifications(false)}
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
                          onClick={() => setShowNotifications(false)}
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-body">

                        <div className="notification_tabs">
                          <button
                            type="button"
                            className={`btn ${notificationTab === "all" ? "active" : ""
                              }`}
                            onClick={() => setNotificationTab("all")}
                          >
                            All
                          </button>

                          <button
                            type="button"
                            className={`btn ${notificationTab === "unread" ? "active" : ""
                              }`}
                            onClick={() => setNotificationTab("unread")}
                          >
                            Unread (
                            {
                              notifications?.filter(
                                (notification) => !notification.isRead
                              ).length
                            }
                            )
                          </button>
                        </div>

                        <div className="notification_listing">

                          {filteredNotifications?.length === 0 ? (
                            <div className="no-notifications">
                              <BsBell />

                              <p className="mb-0">
                                {notificationTab === "unread"
                                  ? "No unread notifications"
                                  : "No notifications yet"}
                              </p>
                            </div>
                          ) : (
                            filteredNotifications?.map((notification) => (
                              <div
                                key={notification.id}
                                className={`notification_list-item ${notification.isRead
                                  ? "read-notification"
                                  : ""
                                  }`}
                                onClick={() => {
                                  markNotificationAsRead(
                                    notification.id
                                  );
                                }}
                              >
                                <h5>
                                  {notification.title}
                                </h5>

                                <p className="mb-0">
                                  {notification.message}
                                </p>

                                <small>
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleString()}
                                </small>
                              </div>
                            ))
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
                onChange={(e) => setDarkMode(e.target.checked)}
              // label={darkMode ? "Dark" : "Light"}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Logout Modal */}

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
            <Image src={CloseModal} alt="close" />
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