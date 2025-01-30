import React, { useEffect, useState } from "react";
import styles from "./link.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import delIcon from "../../assets/del-icon.png";
import sortIcon from "../../assets/sort-icon.png";
import editIcon from "../../assets/edit-icon.png";
import copyIcon from "../../assets/copy-icon.png";
import Modal from "../../components/DeleteLinkModal/Modal";
import toastIcon from "../../assets/toast-icon.png";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Edit from "../EditLinkModal/Edit";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Links = () => {
  const { id } = useParams();
  const username = localStorage.getItem("name");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [newLinkModal, setNewLinkModal] = useState(false);
  const [linkId, setLinkId] = useState();
  const [showEdit, setShowEdit] = useState(false);

  const getAllLinks = async () => {
    const response = await fetch(`${BACKEND_URL}/allUrls/${id}`, {
      method: "GET",
    });
    const result = await response.json();

    if (!response.ok) {
      toast.error("Something went wrong");
      return;
    }

    if (JSON.stringify(result.urls) !== JSON.stringify(data)) {
      setData(result.urls);
    } else {
    }
  };

  useEffect(() => {
    getAllLinks();
    const interval = setInterval(() => {
      getAllLinks();
    }, 5000);
    return () => clearInterval(interval);
  }, [showModal, newLinkModal]);

  //copy link handler

  const copyUrl = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("Link Copied", {
          icon: <img src={toastIcon} />,
          position: "bottom-left",
          className: styles.customToast,
        });
      })
      .catch(() => {
        toast.error("Error in copying link");
      });
  };

  // delete link handler
  const deleteLinkHandler = (id) => {
    setShowModal(!showModal);
    setLinkId(id);
  };

  const editLinkHandler = (id) => {
    setShowEdit(!showEdit);
    setLinkId(id);
  };


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
                  {data.map((url) => (
                    <tr className={styles.tr} key={url._id}>
                      <td className={styles.td}>{url.updatedAt}</td>
                      <td className={`${styles.td} ${styles.original}`}>
                        <p className={styles.tdPara}>{url.originalUrl}</p>
                      </td>
                      <td className={`${styles.td} ${styles.tdWrap}`}>
                        <p className={styles.tdPara}>{url.shortUrl}</p>
                        <img
                          onClick={() => copyUrl(url.shortUrl)}
                          src={copyIcon}
                          className={styles.copyIcnBtn}
                        />
                      </td>

                      <td className={styles.td}>{url.remark}</td>

                      <td className={styles.td}>{url.countOfUrl}</td>

                      <td
                        className={`${styles.tdStatus} ${
                          url.status === "Active" ? "" : styles.inactive
                        }`}
                      >
                        {url.status}
                      </td>

                      <td className={`${styles.td} ${styles.iconWrap}`}>
                        <img
                          src={editIcon}
                          className={styles.iconBtn}
                          onClick={() => editLinkHandler(url._id)}
                        />
                        <img
                          src={delIcon}
                          className={styles.iconBtn}
                          onClick={() => deleteLinkHandler(url._id)}
                        />
                      </td>
                    </tr>
                  ))}

                  {showEdit && (
                    <Edit setShowEdit={setShowEdit} linkId={linkId} />
                  )}

                  {showModal && (
                    <Modal setShowModal={setShowModal} linkId={linkId} />
                  )}
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
