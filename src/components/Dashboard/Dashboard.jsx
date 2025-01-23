import React from "react";
import styles from "./dashboard.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";

const Dashboard = () => {
  const dateData = [
    { label: "21-01-25", value: 1234 },
    { label: "20-01-25", value: 2000 },
    { label: "19-01-25", value: 1500 },
    { label: "18-01-25", value: 34 },
  ];

  const data = [
    { label: "Mobile", value: 1234},
    { label: "Desktop", value: 2000},
    { label: "Tablet", value: 1500 },
    { label: "Others", value: 34 },
  ];

  const maxClicks = Math.max(...data.map((item) => item.value));

  const maxValue = Math.max(...data.map((item) => item.value));

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

          <div className={styles.content}>
            <div className={styles.total}>
              <p className={styles.totalClick}>Total Clicks</p>
              <span className={styles.clicksCounts}>1234</span>
            </div>
            <div className={styles.graphs}>

            <div className={styles.chartContainer}>
              <h4 className={styles.title}>Date-wise Clicks</h4>

                {dateData.map((item, index) => (
                  <div className={styles.bar} key={index}>
                    <span className={styles.label}>{item.label}</span>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${(item.value / maxValue) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.value}>{item.value}</span>
                  </div>
                ))}
              </div>
            
              
              <div className={styles.chartContainer}>
              <h4 className={styles.title}>Click Devices</h4>

                {data.map((item, index) => (
                  <div className={styles.bar} key={index}>
                    <span className={styles.label}>{item.label}</span>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${(item.value / maxValue) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.value}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
