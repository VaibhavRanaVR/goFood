import React, { useState } from "react";
import "./Styles/Login.css";
import login from "./Images/login.jpg";
import { Link } from "react-router-dom";
import Button from "../../ReusableComponents/Button";
import TypeWriter from "../../ReusableComponents/TypeWriter";
import { backendUrl } from "../../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FormControl, FormHelperText } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    axios
      .post(`${backendUrl}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user_info", JSON.stringify(response.data));
          sessionStorage.setItem("userRole", response.data.user.role);
          if (response.data.user.role === "user") {
            navigate("/");
          } else if (response.data.user.role === "admin") {
            navigate("/admin/profile");
          }
        } else {
          setError("Wrong credentials");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("No user found with this email.");
        } else {
          setError("An error occurred. Please try again later.");
        }
        setError("");
      });
  };

  return (
    <div className="Login-Container">
      <div>
        <TypeWriter
          textArray={["Welcome To GOFOOD"]}
          fontSize={window.innerWidth < 600 ? "1.4em" : "1.5em"}
          color="black"
        />
      </div>
      <div className="middle_section">
        <div className="Login-Form-Container">
          <form onSubmit={handleSubmit}>
            <p>
              To keep connected with us please login with your email address and
              password.
            </p>
            <FormControl fullWidth>
              <TextField
                label="Email"
                variant="standard"
                name="email"
                value={email}
                onChange={handleInputChange}
                fullWidth
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
            </FormControl>
            <FormControl
              fullWidth
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              <TextField
                label="Password"
                variant="standard"
                type="password"
                size="large"
                name="password"
                value={password}
                onChange={handleInputChange}
                fullWidth
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
            </FormControl>
            <Button text="Login" type="submit" />
            <p className="Login-Sign-up">
              Not registered? <Link to="/Sign-up">Sign-up</Link>
            </p>
          </form>
        </div>
        <div className="Login-Image-Container img">
          <img src={login} alt="login food" />
        </div>
      </div>
    </div>
  );
};

export default Login;
