import React, { useEffect, useState } from "react";
import styles from "../DeleteModal/delete.module.css";
import icon from "../../assets/close-modal.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Delete = ({ showDeleteModal, deleteModal }) => {
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {}, [deleteModal]);
  const deleteUserHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/delete/${localStorage.getItem("id")}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        toast.error(result.error);
      }
      if (response.ok) {
        toast.success("Account deleted successfully!");
        localStorage.clear();
        showDeleteModal(!deleteModal);
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally{
      setLoading(false)
    }
  };
  return (
    <>
      <div 
      className={styles.overlay}
      onClick={() => showDeleteModal(!deleteModal)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.content}>
          <figure className={styles.iconWrapper}>
            <img
              src={icon}
              alt="icon"
              className={styles.icon}
              onClick={() => showDeleteModal(!deleteModal)}
            />
          </figure>
          <div className={styles.container}>
            <h3 className={styles.title}>
              {" "}
              Are you sure, you want to delete the account ?{" "}
            </h3>
            <div className={styles.btnWrapper}>
              <button
                onClick={() => showDeleteModal(!deleteModal)}
                className={styles.btnNo}
              >
                NO
              </button>
              <button onClick={deleteUserHandler}
               className={`${styles.btnYes} ${loading ? styles.btnDisabled : ""}`}>
                {loading ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Delete;
