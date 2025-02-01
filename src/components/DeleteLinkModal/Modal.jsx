import React, { useState } from "react";
import styles from "./modal.module.css";
import closeIcon from "../../assets/close-modal.png";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Modal = ({ setShowModal, linkId }) => {
  const[loading, setLoading] = useState(false)
  const deleteLink = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/delete/url/${linkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
      if (response.ok) {
        toast.success("Link deleted");
        setShowModal(false)
      }
    } catch (error) {
      toast.error("Something went wrong! Newtwork error")
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => setShowModal(false)}>
        {" "}
      </div>
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.content}>
            <img
              src={closeIcon}
              className={styles.closeIcon}
              onClick={() => setShowModal(false)}
            />
            <h3 className={styles.title}>
              Are you sure, you want to remove it ?
            </h3>
            <div className={styles.btnWrapper}>
              <button
                className={styles.btnNo}
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                No
              </button>
              <button className={`${styles.btnYes} ${loading ? styles.btnDisabled : ""}`} onClick={deleteLink}>
                {loading ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
