import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import sortIcon from "../../assets/sort-icon.png";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Analytics = () => {
  const { id } = useParams();
  const username = localStorage.getItem("name");
  const [data, setData] = useState([]);
  const [newLinkModal, setNewLinkModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/allUrls/${id}`, {
        method: "GET",
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
      setData(result.urls);
    } catch (error) {
      toast.error("Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const newData = data.slice(firstPostIndex, lastPostIndex);


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
            {loading ? (
              <div className={styles.noDataWrapper}>
                <div className={styles.loaderContainer}>
                  <div className={styles.spinner}></div>
                  <h2 className={styles.noData}>Loading</h2>
                </div>
              </div>
            ) : data.length > 0 ? (
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
                    {newData.map((item) => (
                      <tr className={styles.tr} key={item._id}>
                        <td className={styles.td}>{item.updatedAt}</td>
                        <td className={styles.td}>
                          <p className={styles.tdPara}>{item.originalUrl}</p>
                        </td>
                        <td className={`${styles.td} ${styles.wrap}`}>
                          <p className={styles.tdPara}>{item.shortUrl}</p>
                        </td>

                        <td className={styles.td}>{item.ipAddress}</td>

                        <td className={styles.td}>{item.os}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.noDataWrapper}>
                <h2 className={styles.noData}>No data available</h2>
              </div>
            )}
            <footer className={styles.footer}>
              <Pagination
                totalPage={data.length}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
              />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
