import React, { useEffect, useState } from "react";
import styles from "./setting.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import Delete from "../DeleteModal/Delete";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Setting = () => {
  const { id } = useParams();
  const [deleteModal, showDeleteModal] = useState(false);
  const [newLinkModal, setNewLinkModal] = useState(false);
  const [update, setUpdate] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    mobile: localStorage.getItem("mobile"),
  });
  const [username, setUsername] = useState(localStorage.getItem("name"));

  useEffect(() => {
  }, [deleteModal]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validation = () => {
    const newError = {};
    if (!update.name.trim()) {
      newError.name = "Please enter name";
    } else if (update.name.length < 3) {
      newError.name = "Name should be at least 3 characters long";
    }
    if (!update.email.trim()) {
      newError.email = "Please provide your email address";
    } else if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(update.email)) {
      newError.email =
        "Invalid email format. Please use a valid format like example@domain.com";
    }
    if (!update.mobile.trim()) {
      newError.mobile = "Mobile number is required";
    } else if (!/^[0-9]\d{9}$/.test(update.mobile)) {
      newError.mobile = "Invalid mobile number";
    }
    if (Object.keys(newError).length > 0) {
      toast.error(Object.values(newError)[0]);
      return false;
    }
    return true;
  };

  const updateAccountHandler = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const response = await fetch(`${BACKEND_URL}/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        });
        const result = await response.json();
        if (!response.ok) {
          toast.error(result.error);
        }
        if (response.ok) {
          toast.success("Account updated successfully");
          localStorage.setItem("name", update.name);
          localStorage.setItem("email", update.email);
          localStorage.setItem("mobile", update.mobile);
          setUsername(update.name);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    showDeleteModal(!deleteModal);
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
            <form noValidate className={styles.form}>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Name</label>
                <input
                  name="name"
                  type="text"
                  value={update.name}
                  onChange={inputHandler}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Email id</label>
                <input
                  name="email"
                  type="email"
                  value={update.email}
                  onChange={inputHandler}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Mobile no.</label>
                <input
                  name="mobile"
                  type="text"
                  value={update.mobile}
                  onChange={inputHandler}
                  className={styles.input}
                />
              </div>
              <div className={styles.btnWrapper}>
                <button className={styles.btn} onClick={updateAccountHandler}>
                  Save Changes
                </button>
                <button
                  onClick={deleteAccountHandler}
                  className={styles.btnDelete}
                >
                  Delete Account
                </button>
                {deleteModal && (
                  <Delete
                    deleteModal={deleteModal}
                    showDeleteModal={showDeleteModal}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
