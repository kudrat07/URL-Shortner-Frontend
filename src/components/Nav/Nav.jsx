import React, { useEffect, useState } from "react";
import styles from "./nav.module.css";
import plusLogo from "../../assets/plus-icon.png";
import search from "../../assets/search.png";
import logo from "../../assets/star-logo.png";
import NewLinkModal from "../LinkModal/NewLinkModal";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Nav = ({ username, newLinkModal, setNewLinkModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentDate = new Date();
  const [logout, showLogout] = useState(false);
  const [remark, setRemark] = useState("");
  const [greeting, setGreeting] = useState("");
  const token = localStorage.getItem("token");


  useEffect(() => {
    const hour = currentDate.getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }

    if (!token) {
      navigate("/signup");
    }
  }, [token]);

  const showLogoutBtn = () => {
    showLogout(!logout);
  };

  const logoutHandler = () => {
    toast.success("Logout");
    localStorage.clear();
    navigate("/");
  };

  const navigateToLinkHandler = () => {
    if (!remark.trim()) {
      toast.error("Please enter remark");
      return;
    }
    navigate(`/links/${id}`);
  };

  const getFirstTwoLetters = (str) => {
    const words = str.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].slice(0, 2);
    }
    return words[0].charAt(0) + words[1].charAt(0);
  };

  let firstTwoLetters = getFirstTwoLetters(username);
  firstTwoLetters = firstTwoLetters.toUpperCase();

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(currentDate)
    .slice(0, 3);

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" })
    .format(currentDate)
    .slice(0, 3);

  const date = currentDate.getDate();

  const formattedDate = `${dayName}, ${monthName} ${date}`;
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navItems}>
            <div className={styles.navItemFirst}>
              <img src={logo} alt="logo" className={styles.navIcon} />
              <p className={styles.greeting}>{`${greeting},${username}`}</p>
            </div>
            <div className={styles.date}>{formattedDate}</div>
          </div>
          <div className={styles.navItemSecond}>
            <button
              className={styles.btn}
              onClick={() => setNewLinkModal(!newLinkModal)}
            >
              <img src={plusLogo} alt="logo" className={styles.logo} />
              Create new
            </button>
            {newLinkModal && (
              <NewLinkModal
                newLinkModal={newLinkModal}
                setNewLinkModal={setNewLinkModal}
              />
            )}

            <div className={styles.search}>
              <button
                className={styles.searchBtn}
                onClick={navigateToLinkHandler}
              >
                <img src={search} alt="icon" />
              </button>
              <input
                type="text"
                value={remark}
                onChange={(event) => setRemark(event.target.value)}
                className={styles.input}
                placeholder="Search by remarks"
              />
            </div>
          </div>
          <div className={styles.navItemLast} onClick={showLogoutBtn}>
            {firstTwoLetters}
          </div>
          {logout && (
            <button className={styles.logoutBtn} onClick={logoutHandler}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </>
  );
};

export default Nav;
