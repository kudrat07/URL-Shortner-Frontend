import React from "react";
import styles from "./link.module.css";import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";

const Links = () => {
  const username = localStorage.getItem("name")
  return (
    <>
      <div className={styles.container}>
      <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
        <div className={styles.navContainer}>
            <Nav 
              username={username}
            />
          </div>

          <div className={styles.header}>
            <Sidebar />
          </div>



        </div>
      </div>
    </>
  );
};

export default Links;
