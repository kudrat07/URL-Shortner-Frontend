import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import dashboardIcon from "../../assets/dashboard-icon.png";
import linkLogo from "../../assets/link-icon.png";
import logo from "../../assets/analytics-icon.png";
import settingLogo from "../../assets/setting-icon.png";
import cuvetteLogo from "../../assets/cuvette-logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  // Initialize activeBtn from localStorage or set to "dashboard"
  const [activeBtn, setActiveBtn] = useState(
    localStorage.getItem("activeBtn") || "dashboard"
  );

  // Update localStorage whenever activeBtn changes
  useEffect(() => {
    localStorage.setItem("activeBtn", activeBtn);
  }, [activeBtn]);

  // Function to handle state and navigation
  const handleNavigation = (btn, path) => {
    setActiveBtn(btn); // Update active button
    navigate(path); // Navigate to the desired path
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <figure className={styles.imgWrapper}>
          <img
            src={cuvetteLogo}
            alt="Cuvette Logo"
            className={styles.cuvetteLogo}
          />
        </figure>
        <div className={styles.btnContainer}>
          <div className={styles.btnWrapper}>
            {/* Dashboard Button */}
            <button
              className={`${styles.btn} ${
                activeBtn === "dashboard" ? styles.primary : ""
              }`}
              onClick={() => handleNavigation("dashboard", `/dashboard/${id}`)}
            >
              <img
                src={dashboardIcon}
                alt="Dashboard Icon"
                className={styles.sidebarIcon}
              />
              <p className={styles.btnPara}>Dashboard</p>
            </button>

            {/* Links Button */}
            <button
              className={`${styles.btn} ${
                activeBtn === "links" ? styles.primary : ""
              }`}
              onClick={() => handleNavigation("links", `/links/${id}`)}
            >
              <img src={linkLogo} alt="Links Icon" className={styles.sidebarIcon} />
              <p className={styles.btnPara}>Links</p>
            </button>

            {/* Analytics Button */}
            <button
              className={`${styles.btn} ${
                activeBtn === "analytics" ? styles.primary : ""
              }`}
              onClick={() => handleNavigation("analytics", `/analytics/${id}`)}
            >
              <img src={logo} alt="Analytics Icon" className={styles.sidebarIcon} />
              <p className={styles.btnPara}>Analytics</p>
            </button>

            {/* Settings Button */}
            <div className={styles.setting}>
              <button
                className={`${styles.btnSetting} ${
                  activeBtn === "setting" ? styles.primary : ""
                }`}
                onClick={() => handleNavigation("setting", `/setting/${id}`)}
              >
                <img
                  src={settingLogo}
                  alt="Settings Icon"
                  className={styles.sidebarIcon}
                />
                <p className={styles.btnPara}>Settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
