import React, { useState } from "react";
import styles from "./login.module.css";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import mainLogo from "../../assets/main-logo.png";
import logo from "../../assets/cuvette-logo.png";
import Btn from "../../components/LoginSignBtn/Btn";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateError = () => {
    const newError = {};
    if (!formData.email.trim()) {
      newError.email = "Please provide your email address";
    } else if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email =
        "Invalid email format. Please use a valid format like example@domain.com";
    }

    if (!formData.password.trim()) {
      newError.password = "Password is required";
    }
    if (Object.keys(newError).length > 0) {
      toast.error(Object.values(newError)[0]);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateError()) {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Login successful! Welcome back!");
          setFormData({
            email: "",
            password: "",
          });
          navigate(`/`);
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (error) {
        toast.error("Network error. Please try again later");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <img src={mainLogo} alt="logo" className={styles.logo} />
          <img src={logo} alt="cuvette logo" className={styles.cuvetteLogo} />
        </div>

        <div className={styles.halfContainer}>
          <nav className={styles.nav}>
            <Btn />
          </nav>

          <div className={styles.wrapper}>
            <div className={styles.formContainer}>
              <h2 className={styles.title}>Login</h2>
              <form noValidate className={styles.form}>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className={styles.input}
                    onChange={inputHandler}
                    placeholder="Email id"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className={styles.input}
                    onChange={inputHandler}
                    placeholder="Password"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className={styles.btn}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
                <p className={styles.footerText}>
                  Don’t have an account?
                  <Link to="/signup" className={styles.link}>
                    SignUp
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
