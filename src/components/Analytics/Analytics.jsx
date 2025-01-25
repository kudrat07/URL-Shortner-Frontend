import React from "react";
import styles from "./analytics.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";

const Analytics = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
          <div className={styles.navContainer}>
            <Nav />
          </div>

          <div className={styles.header}>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
