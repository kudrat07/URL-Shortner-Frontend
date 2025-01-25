import React, { useState } from "react";
import styles from "./sidebar.module.css";
import dashboardIcon from "../../assets/dashboard-icon.png";
import linkLogo from "../../assets/link-icon.png";
import logo from "../../assets/analytics-icon.png";
import settingLogo from "../../assets/setting-icon.png";
import cuvetteLogo from "../../assets/cuvette-logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("dashboard");
  const active = (btn) => {
    setActiveBtn(btn);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <figure className={styles.imgWrapper}>
          <img
            src={cuvetteLogo}
            alt="cuvette Logo"
            className={styles.cuvetteLogo}
          />
        </figure>
        <div className={styles.btnContainer}>
          <div className={styles.btnWrapper}>
            <button
              className={`${styles.btn} 
           ${activeBtn === "dashboard" ? styles.primary : ""}`}
              onClick={() => {
                active("dashboard");
                navigate(`/dashboard/:id`)
              }}
            >
              <img
                src={dashboardIcon}
                alt="icon"
                className={styles.sidebarIcon}
              />
              <p className={styles.btnPara}>Dashboard</p>
            </button>

            <button
              className={`${styles.btn} 
           ${activeBtn === "links" ? styles.primary : ""}`}
              onClick={() => {
                active("links");
                navigate(`/links/:id`)
              }}
            >
              <img src={linkLogo} alt="icon" className={styles.sidebarIcon} />
              <p className={styles.btnPara}>Links</p>
            </button>
            <button
              className={`${styles.btn} 
           ${activeBtn === "analytics" ? styles.primary : ""}`}
              onClick={() => {
                active("analytics");
                navigate(`/analytics/:id`)
              }}
            >
              <img src={logo} alt="icon" className={styles.sidebarIcon} />
              <p className={styles.btnPara}>Analytics</p>
            </button>
            <div className={styles.setting}>
              <button
                className={`${styles.btnSetting} 
           ${activeBtn === "setting" ? styles.primary : ""}`}
                onClick={() => {
                  active("setting");
                  navigate(`/setting/:id`)
                }}
              >
                <img
                  src={settingLogo}
                  alt="icon"
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
