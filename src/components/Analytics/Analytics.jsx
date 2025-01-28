import React from "react";
import styles from "./analytics.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import sortIcon from "../../assets/sort-icon.png";

const Analytics = () => {
  const username = localStorage.getItem("name");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
          <div className={styles.navContainer}>
            <Nav username={username} />
          </div>

          <div className={styles.header}>
            <Sidebar />
          </div>

          <div className={styles.content}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <th className={`${styles.th} ${styles.wrap}`}>
                    Timestamp
                    <img src={sortIcon} alt="" />
                  </th>
                  <th className={styles.th}>Original Link</th>
                  <th className={styles.th}>Short Link</th>
                  <th className={styles.th}>ip address</th>
                  <th className={styles.th}>User Device</th>
                </thead>
                <tbody className={styles.tbody}>
                 
                  
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                    </td>

                    <td className={styles.td}>192.158.1.38</td>

                    <td className={styles.td}>Android</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                    </td>

                    <td className={styles.td}>192.158.1.38</td>

                    <td className={styles.td}>Android</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                    </td>

                    <td className={styles.td}>192.158.1.38</td>

                    <td className={styles.td}>Android</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                    </td>

                    <td className={styles.td}>192.158.1.38</td>

                    <td className={styles.td}>Android</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                    </td>

                    <td className={styles.td}>192.158.1.38</td>

                    <td className={styles.td}>Android</td>
                  </tr>
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                    </td>

                    <td className={styles.td}>192.158.1.38</td>

                    <td className={styles.td}>Android</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
