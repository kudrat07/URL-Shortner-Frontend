import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const { id } = useParams();
  const username = localStorage.getItem("name");
  const [newLinkModal, setNewLinkModal] = useState(false);
  const [info, setInfo] = useState([]);
  const [totalCounts, setTotalCounts] = useState(0);
  const [deviceClicks, setDeviceClicks] = useState([]);
  const [dateClicks, setDateClicks] = useState([]);

  const getStats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/count/${id}`, {
        method: "GET",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Something went wrong while fetching data");
        return;
      }

      if (Object.keys(result).length === 0) {
        setTotalCounts(0);
        setDeviceClicks([]);
        setDateClicks([]);
        return;
      }

      const sortedDateClicks = result.dateWiseClicks.sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB - dateA;
      });

      setInfo(result);
      setTotalCounts(result.totalCounts);
      setDeviceClicks(result.deviceCounts);
      setDateClicks(sortedDateClicks);
    } catch (error) {
      toast.error("Something went wrong while fetching data");
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const maxClicksDateWise = Math.max(1, ...dateClicks.map((item) => item.cumulativeClicks));
  const maxDeviceClicks = Math.max(1, ...deviceClicks.map((item) => item.count));

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
              setNewLinkModal={setNewLinkModal}
              newLinkModal={newLinkModal}
            />
          </div>

          <div className={styles.header}>
            <Sidebar />
          </div>

          <div className={styles.content}>
            <div className={styles.total}>
              <p className={styles.totalClick}>Total Clicks</p>
              <span className={styles.clicksCounts}>{totalCounts}</span>
            </div>
            <div className={styles.graphs}>
              <div className={styles.chartContainer}>
                <h4 className={styles.title}>Date-wise Clicks</h4>

                {dateClicks.map((item, index) => (
                  <div className={styles.bar} key={index}>
                    <span className={styles.label}>{item.date}</span>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${(item.cumulativeClicks / maxClicksDateWise) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.value}>
                      {item.cumulativeClicks}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.chartContainer}>
                <h4 className={styles.title}>Click Devices</h4>

                {deviceClicks.map((item, index) => (
                  <div className={styles.bar} key={index}>
                    <span className={styles.label}>{item.name}</span>
                    <div className={styles.barContainer}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${(item.count / maxDeviceClicks) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className={styles.value}>{item.count}</span>
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
