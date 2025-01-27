import React, { useState } from "react";
import styles from "./link.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import delIcon from "../../assets/del-icon.png";
import sortIcon from "../../assets/sort-icon.png";
import editIcon from "../../assets/edit-icon.png";
import copyIcon from "../../assets/copy-icon.png";
import Modal from "../../components/DeleteLinkModal/Modal";
import toast from "react-hot-toast";

const Links = () => {
  const username = localStorage.getItem("name");
  const [showModal, setShowModal] = useState(false);

  const deleteLinkHandler = () => {
    toast.success("clicked");
    setShowModal(!showModal);
  };

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
                    Date
                    <img src={sortIcon} alt="" />
                  </th>
                  <th className={styles.th}>Original Link</th>
                  <th className={styles.th}>Short Link</th>
                  <th className={styles.th}>Remarks</th>
                  <th className={styles.th}>Clicks</th>
                  <th className={`${styles.th} ${styles.wrap}`}>
                    Status
                    <img src={sortIcon} alt="" />
                  </th>
                  <th className={styles.th}>Action</th>
                </thead>
                <tbody className={styles.tbody}>
                  <tr className={styles.tr}>
                    <td className={styles.td}>Jan 14, 2025 16:30</td>
                    <td className={styles.td}>https://www.google.com</td>
                    <td className={`${styles.td} ${styles.wrap}`}>
                      https://www.google.com
                      <img src={copyIcon} alt="" className={styles.iconBtn} />
                    </td>

                    <td className={styles.td}>campaign1</td>

                    <td className={styles.td}>5</td>

                    <td className={styles.td}>Active</td>

                    <td className={`${styles.td} ${styles.iconWrap}`}>
                      <img src={editIcon} alt="" className={styles.iconBtn} />
                      <img
                        src={delIcon}
                        className={styles.iconBtn}
                        onClick={() => setShowModal(!showModal)}
                      />
                    </td>
                  </tr>
                  {showModal && <Modal 
                    setShowModal={setShowModal}

                  />}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Links;
