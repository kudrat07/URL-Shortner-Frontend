import React, { useEffect, useState } from "react";
import styles from "./edit.module.css";
import close from "../../assets/close.png";
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Edit = ({ setShowEdit, linkId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [linkData, setLinkData] = useState({
    originalUrl: "",
    remark: "",
    expiryDate: "",
  });

  const getUrl = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/url/${linkId}`, {
        method: "GET",
      });
      const result = await response.json();
      if (result.expiryDate) {
        result.expiryDate = new Date(result.expiryDate).toLocaleString(
          "en-US",
          {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }
        );
      }
      setLinkData(result);
      setIsChecked(result.expiryDate);
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
    } catch (error) {
      toast.error("Something went wrong! Network error");
    }

  };
  
  useEffect(() => {
    getUrl();
  }, []);


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLinkData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearHandler = () => {
    setLinkData({
      originalUrl: "",
      remark: "",
      expiryDate: "",
    });
    toast.success("Cleard");
  };

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
    if (Object.keys(newError).length > 0) {
      toast.error(Object.values(newError)[0]);
      return false;
    }
    return true;
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (validateError()) {
      try {
        const requestData = { ...linkData };
  
        // Ensure expiryDate is in GMT if set
        if (isChecked && linkData.expiryDate) {
          const gmtExpiryDate = new Date(linkData.expiryDate).toISOString();
          requestData.expiryDate = gmtExpiryDate;
        } else {
          delete requestData.expiryDate;
        }
  
        console.log("Request Data:", requestData);
  
        const response = await fetch(`${BACKEND_URL}/updateUrl/${linkId}`, {
          method: "PUT",
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
  
        toast.success("URL updated successfully!");
        setShowEdit(false);
        setLinkData({
          originalUrl: "",
          remark: "",
          expiryDate: "",
        });
      } catch (error) {
        toast.error("Something went wrong while updating link");
      }
    }
  };
  

  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => setShowEdit(false)}></div>
      <div className={styles.modal}>
        <div className={styles.content}>
          <nav className={styles.nav}>
            <h3 className={styles.navTitle}>Edit Link</h3>
            <img
              src={close}
              alt="close icon"
              className={styles.close}
              onClick={() => setShowEdit(false)}
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
                  checked={isChecked}
                />
                <label htmlFor="toggle" className={styles.switch}></label>
              </div>
            </div>
            {isChecked && (
              <div className={styles.date}>
                <input
                  name="expiryDate"
                  type="datetime-local"
                  value={formatDateForInput(linkData.expiryDate)}
                  className={styles.input}
                  onChange={inputHandler}
                />
              </div>
            )}
          </div>
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <h3 className={styles.clear} onClick={clearHandler}>
                Clear
              </h3>
              <button className={styles.submitBtn} onClick={updateHandler}>
                Save
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Edit;
