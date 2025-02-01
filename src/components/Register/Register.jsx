import React, { useState } from "react";
import styles from "./register.module.css";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import mainLogo from "../../assets/main-logo.png";
import logo from "../../assets/cuvette-logo.png";
import Btn from "../../components/LoginSignBtn/Btn"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Form Validation
  const validateError = () => {
    const newError = {};
    if (!formData.name.trim()) {
      newError.name = "Username is required";
    } else if (!(formData.name.length > 2)) {
      newError.name = "Name should be at least 3 characters long";
    }
    if (!formData.email.trim()) {
      newError.email = "Please provide your email address";
    } else if (!/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email =
        "Invalid email format. Please use a valid format like example@domain.com";
    }
    if (!formData.mobile.trim()) {
      newError.mobile = "Mobile number is required";
    } else if (!/^[0-9]\d{9}$/.test(formData.mobile)) {
      newError.mobile = "Invalid mobile number";
    }
    if (!formData.password.trim()) {
      newError.password = "Password is required";
    } else if (formData.password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
    } else if (!/[a-z]/.test(formData.password)) {
      newError.password = "Password must contain atleast one lowercase letter";
    } else if (!/[A-Z]/.test(formData.password)) {
      newError.password = "Password must contain atleast one uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newError.password = "Password must contain atleast one special character";
    }

    if (!formData.confirmPassword.trim()) {
      newError.confirmPassword = "Please confirm your password";
    }
    if (formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        newError.confirmPassword = "Passwords did not match. Please try again";
      }
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
        const response = await fetch(`${BACKEND_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          
          toast.success("Registration successful");
          localStorage.setItem("name",`${data.name}`);
          localStorage.setItem("mobile", `${data.mobile}`);
          localStorage.setItem("email", `${data.email}`)
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        } else {
          toast.error(data.message || "Registration failed, Try again!");
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
        <div className={styles.btnWrapper}>
          <Btn />
        </div>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Join us Today!</h2>
          <form noValidate className={styles.form}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="name"
                value={formData.name}
                className={styles.input}
                onChange={inputHandler}
                placeholder="Name"
              />
            </div>
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
                type="text"
                name="mobile"
                value={formData.method}
                className={styles.input}
                onChange={inputHandler}
                placeholder="Mobile no"
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
            <div className={styles.inputContainer}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                className={styles.input}
                onChange={inputHandler}
                placeholder="Confirm Password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`${styles.btn} ${loading ? styles.btnDisabled : ""}`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
            <p className={styles.footerText}>
              Already have an account?
              <Link to="/" className={styles.link}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
