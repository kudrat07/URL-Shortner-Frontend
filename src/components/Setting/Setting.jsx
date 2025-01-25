import React, { useState } from "react";
import styles from "./setting.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import Delete from "../DeleteModal/Delete";

const Setting = () => {
  const [deleteModal, showDeleteModal] = useState(false)

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    showDeleteModal(!deleteModal)
  }
  const updateAccountHandler = (e) => {
    e.preventDefault();
  }
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

          <div className={styles.header}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <form noValidate className={styles.form}>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Name</label>
                <input 
                name="name"
                type="text" value="Kudrat Hussain"
                className={styles.input}
                 />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Email id</label>
                <input 
                name="email"
                type="email" value="k@gmail.com" 
                className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Mobile no.</label>
                <input
                name="mobile" 
                type="text" value="1122334455"
                className={styles.input}
                 />
              </div>
              <div className={styles.btnWrapper}>
                <button 
                className={styles.btn}
                onClick={updateAccountHandler}
                >
                Save Changes</button>
                <button 
                onClick={deleteAccountHandler}
                className={styles.btnDelete}
                >
                Delete Account
                </button>
                {
                  deleteModal &&

                   <Delete
                    deleteModal={deleteModal}
                    showDeleteModal={showDeleteModal}
                   />
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
