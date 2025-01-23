import React,{useState} from "react";
import styles from "./nav.module.css";
import plusLogo from "../../assets/plus-icon.png";
import search from "../../assets/search.png";
import logo from "../../assets/star-logo.png";
import NewLinkModal from "../LinkModal/NewLinkModal"

const Nav = () => {
  const currentDate = new Date();
  const [showModal, setShowModal] = useState(false);

  const username = "Kudrat Hussain";
  const firstLetters = username
    .split(" ")
    .reduce((acc, word) => acc + word[0], "");

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
      <div>
        <nav className={styles.nav}>
          <div className={styles.navItems}>
            <div className={styles.navItemFirst}>
              <img src={logo} alt="logo" className={styles.navIcon} />
              <p className={styles.greeting}>Good morning, Kudrat</p>
            </div>

            <div className={styles.date}>{formattedDate}</div>
          </div>

          <div className={styles.navItemSecond}>
            <button 
            className={styles.btn}
            onClick={() => setShowModal(!showModal)}
            >
              <img src={plusLogo} alt="logo" className={styles.logo} />
              Create new
            </button>
            {showModal && <NewLinkModal
            setShowModal={setShowModal}
            />}
            
            <div className={styles.search}>
              <button className={styles.searchBtn}>
                <img src={search} alt="icon" />
              </button>
              <input
                type="text"
                className={styles.input}
                placeholder="Search by remarks"
              />
            </div>
          </div>
          <div className={styles.navItemLast}>{firstLetters}</div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
