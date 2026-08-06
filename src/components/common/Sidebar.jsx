
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import CloseModal from "@/images/CloseModal.svg";
import { resetERPStorage } from "@/utils/resetStorage";
import { Form, Modal } from "react-bootstrap";
import AdminNavbar from "./navbars/admin-navbar";
import { BsBell, BsSearch, BsSliders2 } from "react-icons/bs";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);


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
            <span className="settings-icon">
              <BsBell />
            </span>
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