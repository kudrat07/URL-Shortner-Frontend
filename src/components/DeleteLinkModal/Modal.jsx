import React from "react";
import styles from "./modal.module.css";
import closeIcon from "../../assets/close-modal.png";

const Modal = ({ setShowModal }) => {
  return (
    <>
      <div 
      className={styles.overlay}
      onClick={() => setShowModal(false)}
      > </div>
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
                >
                No
                </button>
                <button className={styles.btnYes}>Yes</button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Modal;
