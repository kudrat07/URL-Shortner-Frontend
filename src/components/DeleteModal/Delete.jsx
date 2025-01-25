import React from "react";
import styles from "../DeleteModal/delete.module.css";
import icon from "../../assets/close-modal.png";

const Delete = ({ showDeleteModal}) => {

    const deleteUserHandler = (e) => {
        e.preventDefault();

    }
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <div className={styles.content}>
            <figure className={styles.iconWrapper}>
              <img 
              src={icon}
               alt="icon" 
               className={styles.icon}
               onClick={() => showDeleteModal(false)}
                />
            </figure>
          <div className={styles.container}>
            <h3 className={styles.title}> Are you sure, you want to delete the account ? </h3>
            <div className={styles.btnWrapper}>
              <button
              onClick={() => showDeleteModal(false)}
               className={styles.btnNo}
               >
               NO

               </button>
              <button
              onClick={deleteUserHandler}
               className={styles.btnYes}>
              YES
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delete;
