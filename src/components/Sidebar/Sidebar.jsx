import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import dashboardIcon from "../../assets/dashboard-icon.png";
import dashNormal from "../../assets/dashboard-normal.png";
import linkLogo from "../../assets/link-icon.png";
import linkLogoBlue from "../../assets/link-blue.png";
import logo from "../../assets/analytics-icon.png";
import logoBlue from "../../assets/analytics-blue.png"
import settingLogo from "../../assets/setting-icon.png";
import setting from "../../assets/Frame.png";
import cuvetteLogo from "../../assets/cuvette-logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [activeBtn, setActiveBtn] = useState(
    localStorage.getItem("activeBtn") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeBtn", activeBtn);
  }, [activeBtn]);

  const handleNavigation = (btn, path) => {
    setActiveBtn(btn); 
    navigate(path); 
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
            {
              activeBtn ==="dashboard" ? (<img
                src={dashboardIcon}
                alt="Dashboard Icon"
                className={styles.sidebarIcon}
              />) : (<img
                src={dashNormal}
                alt="Dashboard Icon"
                className={styles.sidebarIcon}
              />)
            }
              
              <p className={styles.btnPara}>Dashboard</p>
            </button>

            {/* Links Button */}
            <button
              className={`${styles.btn} ${
                activeBtn === "links" ? styles.primary : ""
              }`}
              onClick={() => handleNavigation("links", `/links/${id}`)}
            >

            {
              activeBtn === "links" ? (<img src={linkLogoBlue} alt="Links Icon" className={styles.sidebarIcon} />) : (<img src={linkLogo} alt="Links Icon" className={styles.sidebarIcon} />)
            }
              
              <p className={styles.btnPara}>Links</p>
            </button>

            {/* Analytics Button */}
            <button
              className={`${styles.btn} ${
                activeBtn === "analytics" ? styles.primary : ""
              }`}
              onClick={() => handleNavigation("analytics", `/analytics/${id}`)}
            >
            {
              activeBtn === "analytics" ? (<img src={logoBlue} alt="Analytics Icon" className={styles.sidebarIcon} />) : (<img src={logo} alt="Analytics Icon" className={styles.sidebarIcon} />)
            }
              
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
              {
                activeBtn === "setting" ? (<img
                  src={setting}
                  alt="Settings Icon"
                  className={styles.sidebarIcon}
                />) : (<img
                  src={settingLogo}
                  alt="Settings Icon"
                  className={styles.sidebarIcon}
                />)
              }
                
                <p className={`${styles.btnPara} ${activeBtn === "setting" ? "" : styles.color}`}>Settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
