import React, { useState } from "react";
import styles from "./modal.module.css";
import close from "../../assets/close.png";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const NewLinkModal = ({ newLinkModal, setNewLinkModal }) => {
  const {id}  = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const[loading, setLoading] = useState(false)
  const [linkData, setLinkData] = useState({
    originalUrl: "",
    remark: "",
    expiryDate: "",
  });


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLinkData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearHandler = () => {
    setLinkData({
      originalUrl:"",
      remark:"",
      expiryDate:""
    })
    toast.success("Cleard")
  }

  const validateError = () => {
    const newError = {};

    if (!linkData.originalUrl.trim()) {
      newError.originalUrl = "Destination URL is required.";
    } 
    

    if (!linkData.remark.trim()) {
      newError.remark = "Remarks cannot be empty.";
    }

    if (isChecked && !linkData.expiryDate.trim()) {
      newError.expiryDate = "Please select an expiration date.";
    }
    if(Object.keys(newError).length > 0) {
      toast.error(Object.values(newError)[0])
      return false;
    }
    return true;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateError()) {
      try {
        setLoading(true);
        let expiryDateGMT = null;
        // Convert expiry date to GMT format if provided
        if (linkData.expiryDate) {
          const localDate = new Date(linkData.expiryDate);
          expiryDateGMT = localDate.toISOString(); // Always in UTC/GMT timezone
        }
  
        const requestData = {
          ...linkData,
          expiryDate: expiryDateGMT,
        };
  
        const response = await fetch(`${BACKEND_URL}/url/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          toast.error(result.message);
          return;
        }
  
        if (response.ok) {
          toast.success("Link created");
          setNewLinkModal(!newLinkModal);
          setLinkData({
            originalUrl: "",
            remark: "",
            expiryDate: "",
          });
        }
      } catch (error) {
        toast.error("Something went wrong while creating the link");
      } finally{
        setLoading(true)
      }
    }
  };
  



  return (
    <>
      <div className={styles.overlay} onClick={() => setNewLinkModal(!newLinkModal)}></div>
      <div className={styles.modal}>
        <div className={styles.content}>
          <nav className={styles.nav}>
            <h3 className={styles.navTitle}>New link</h3>
            <img
              src={close}
              alt="close icon"
              className={styles.close}
              onClick={() => setNewLinkModal(!newLinkModal)}
            />
          </nav>
          <div className={styles.main}>
            <div className={styles.inputContainer}>
              <label htmlFor="link" className={styles.label}>
                Destination Url <span className={styles.span}>*</span>
              </label>
              <input
                type="text"
                name="originalUrl"
                value={linkData.originalUrl}
                className={styles.input}
                placeholder="https://web.whatsapp.com/"
                onChange={inputHandler}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="link" className={styles.label}>
                Remarks <span className={styles.span}>*</span>
              </label>
              <textarea
                name="remark"
                id="remark"
                value={linkData.remark}
                className={styles.textarea}
                placeholder="Add remarks"
                onChange={inputHandler}
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
                <input
                  name="expiryDate"
                  type="datetime-local"
                  value={linkData.expiryDate}
                  className={styles.input}
                  onChange={inputHandler}
                />
              </div>
            )}
          </div>
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <h3 
              className={styles.clear}
              onClick={clearHandler}
              >Clear</h3>
              <button
               className={`${styles.submitBtn} ${loading ? styles.btnDisabled : ""}`}
               onClick={handleSubmit}
               disabled={loading}
               >
               {loading ? "Creating..." :"Create new"}
            </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default NewLinkModal;
