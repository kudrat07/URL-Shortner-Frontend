import React, { useState } from "react";
import styles from "./modal.module.css";
import close from "../../assets/close.png";

const NewLinkModal = ({ setShowModal }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div className={styles.overlay} onClick={() => setShowModal(false)}></div>
      <div className={styles.modal}>
        <div className={styles.content}>
          <nav className={styles.nav}>
            <h3 className={styles.navTitle}>New link</h3>
            <img
              src={close}
              alt="close icon"
              className={styles.close}
              onClick={() => setShowModal(false)}
            />
          </nav>
          <div className={styles.main}>
            <div className={styles.inputContainer}>
              <label htmlFor="link" className={styles.label}>
                Destination Url <span className={styles.span}>*</span>
              </label>
              <input
                type="text"
                name="link"
                className={styles.input}
                placeholder="https://web.whatsapp.com/"
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="link" className={styles.label}>
                Remarks <span className={styles.span}>*</span>
              </label>
              <textarea
                name="remark"
                id="remark"
                className={styles.textarea}
                placeholder="Add remarks"
              ></textarea>
            </div>
            <div className={styles.expiration}>
              <p className={styles.expiryText}>Link Expiration</p>
              <div>
                <input
                  type="checkbox"
                  name="checkbox"
                  id="toggle"
                  onClick={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="toggle" className={styles.switch}></label>
              </div>
            </div>
            {isChecked && (
              <div className={styles.date}>
                <input type="datetime-local" className={styles.input} />
              </div>
            )}
          </div>
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <h3 className={styles.clear}>Clear</h3>
              <button className={styles.submitBtn}>Create new</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NewLinkModal;
