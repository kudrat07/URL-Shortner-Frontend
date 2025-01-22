import React, { useState } from "react";
import styles from "./login.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const[loading, setLoading] = useState(false);


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
        if(validateError()) {
            try {
                setLoading(true)
                const response = await fetch(`${BACKEND_URL}/login`, {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if(response.ok){
                    toast.success("Login successful! Welcome back!");
                    setFormData({
                        email:"",
                        password:"",
                    });
                    navigate(`/`);

                }
                else{
                    toast.error(data.message || "Login failed")
                }
            } catch (error) {
                toast.error("Network error. Please try again later");
            } finally{
                setLoading(false);
            }
        }
  };

  return (
    <div>
      <h2>Login</h2>
      <form noValidate>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={styles.input}
            onChange={inputHandler}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className={styles.input}
            onChange={inputHandler}
          />
        </div>
      <button
      onClick={handleSubmit} className={styles.btn}
      disabled={loading}
      >
        {loading ? "Logging..." : "Log in"}
      </button>
      </form>
    </div>
  );
};

export default Login;
