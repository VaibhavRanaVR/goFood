import React, { useEffect, useState } from "react";
import "./Styles/Login.css";
import login from "./Images/login.jpg";
import { Link } from "react-router-dom";
import Button from "../../ReusableComponents/Button";
import TypeWriter from "../../ReusableComponents/TypeWriter";
import { backendUrl } from "../../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showImage, setShowImage] = useState(true); // State to manage image visibility
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
          if (response.status === 400) {
            alert("Wrong credentials");
          }
        }
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="Login-Container">
      <div>
        <TypeWriter
          textArray={["Welcome To GOFOOD"]}
          fontSize={windowWidth < 600 ? "1.4em" : "1.5em"}
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
            <div className="Input-Container">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
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
