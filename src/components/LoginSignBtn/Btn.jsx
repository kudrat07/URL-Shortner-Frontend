import React from "react";
import styles from "./btn.module.css";
import { useNavigate } from "react-router-dom";

const Btn = () => {
  const handleLogin = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  const navigate = useNavigate();
  return (
    <div className={styles.btnContainer}>
      <button onClick={handleSignup} className={styles.btnSignup}>
        SignUp
      </button>
      <button onClick={handleLogin} className={styles.btnLogin}>
        Login
      </button>
    </div>
  );
};

export default Btn;
