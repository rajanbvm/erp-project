import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import CloseModal from "@/images/CloseModal.svg";
import { resetERPStorage } from "@/utils/resetStorage";
import { Form, Modal } from "react-bootstrap";
import AdminNavbar from "./navbars/admin-navbar";

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

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notificationTab, setNotificationTab] =
    useState("all");

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(false);


  /* =========================================================
     DARK MODE
  ========================================================= */

  useEffect(() => {

    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

  }, [darkMode]);


  /* =========================================================
     NOTIFICATION BODY OVERFLOW
  ========================================================= */

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

  /* =========================================================
     LOAD NOTIFICATIONS
  ========================================================= */

  useEffect(() => {

    const loadNotifications = () => {

      setNotifications(
        getNotifications()
      );

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


  /* =========================================================
     UNREAD COUNT
  ========================================================= */

  const unreadCount =
    notifications?.filter(
      (notification) =>
        !notification?.isRead
    ).length;


  /* =========================================================
     FILTER NOTIFICATIONS
  ========================================================= */

  const filteredNotifications =
    notificationTab === "unread"
      ? notifications?.filter(
        (notification) =>
          !notification?.isRead
      )
      : notifications;


  /* =========================================================
     HANDLE NOTIFICATION CLICK
  ========================================================= */

  const handleNotificationClick = (
    notification
  ) => {

    /*
    |--------------------------------------------------------------------------
    | Mark notification as read
    |--------------------------------------------------------------------------
    */

    markNotificationAsRead(
      notification?.id
    );


    /*
    |--------------------------------------------------------------------------
    | Close notification modal
    |--------------------------------------------------------------------------
    */

    setShowNotifications(false);


    /*
    |--------------------------------------------------------------------------
    | Get destination route
    |--------------------------------------------------------------------------
    */

    const route =
      getNotificationRoute(
        notification
      );


    /*
    |--------------------------------------------------------------------------
    | Redirect
    |--------------------------------------------------------------------------
    */

    if (route) {

      router.push(route);

    }

  };
  /* =========================================================
     MARK ALL NOTIFICATIONS AS READ
  ========================================================= */

  const handleMarkAllAsRead = () => {

    if (unreadCount === 0) {
      return;
    }

    markAllNotificationsAsRead();

  };

  return (
    <>
      {/* =====================================================
                SIDEBAR
            ===================================================== */}

      <AdminNavbar />


      {/* =====================================================
                HEADER
            ===================================================== */}

      <div className="dash-header">

        <div className="header-section">


          {/* =================================================
                        SEARCH
                    ================================================= */}

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


          {/* =================================================
                        HEADER ACTIONS
                    ================================================= */}

          <div className="header-actions">


            {/* =============================================
                            SETTINGS
                        ============================================= */}

            <span
              className="settings-icon"
              onClick={
                resetERPStorage
              }
              style={{
                cursor: "pointer",
              }}
            >
              <BsSliders2 />
            </span>


            {/* =============================================
                            NOTIFICATIONS
                        ============================================= */}

            <div className="notification-wrapper">

              <span
                className="settings-icon"
                onClick={() =>
                  setShowNotifications(
                    (prev) => !prev
                  )
                }
                style={{
                  cursor: "pointer",
                }}
              >
                <BsBell />
              </span>


              {/* =========================================
                                NOTIFICATION COUNT
                            ========================================= */}

              <span className="notification-count">
                {unreadCount}
              </span>

              {/* =========================================
                                NOTIFICATION MODAL
                            ========================================= */}

              {showNotifications && (

                <div
                  className="notification-modal-overlay"
                  onClick={() =>
                    setShowNotifications(
                      false
                    )
                  }
                >

                  <div
                    className="notificationModalcontent"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    <div className="modal-content">


                      {/* =================================
                                                MODAL HEADER
                                            ================================= */}

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


                      {/* =================================
                                                MODAL BODY
                                            ================================= */}

                      <div className="modal-body">


                        {/* =================================
                                                    TABS
                                                ================================= */}
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
                              {unreadCount}
                              )
                            </button>

                          </div>
                          <div className="notification_tabs w-50">
                            <button
                              type="button"
                              className="btn btn-outline-primary markAllRead ms-auto"
                              onClick={handleMarkAllAsRead}
                              disabled={unreadCount === 0}
                            >
                              Mark all as read
                            </button>
                          </div>
                        </div>



                        {/* =================================
                                                    NOTIFICATION LIST
                                                ================================= */}

                        <div className="notification_listing">


                          {/* =================================
                                                        EMPTY STATE
                                                    ================================= */}

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
                              (
                                notification
                              ) => (

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


            {/* =================================================
                            DARK MODE
                        ================================================= */}

            <span className="theme-icon">

              <Form.Check
                type="switch"
                id="theme-switch"
                checked={
                  darkMode
                }
                onChange={(e) =>
                  setDarkMode(
                    e.target.checked
                  )
                }
              />

            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
                LOGOUT MODAL
            ===================================================== */}

      <Modal
        show={showLogoutModal}
        onHide={() =>
          setShowLogoutModal(
            false
          )
        }
        centered
      >

        <Modal.Body className="logout-modal">


          {/* Close */}

          <button
            className="close-modal-btn"
            onClick={() =>
              setShowLogoutModal(
                false
              )
            }
          >

            <Image
              src={CloseModal}
              alt="close"
            />

          </button>


          <h5>
            Logout
          </h5>


          <p className="w-75 mx-auto">
            Are you sure you want to logout?
          </p>


          <div className="logout-footer">


            {/* Cancel */}

            <button
              className="btn-primary br-30"
              onClick={() =>
                setShowLogoutModal(
                  false
                )
              }
            >
              Cancel
            </button>


            {/* Logout */}

            <button
              className="btn-outline-secondary"
              onClick={() => {

                alert(
                  "Logout Successfully"
                );

                setShowLogoutModal(
                  false
                );

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