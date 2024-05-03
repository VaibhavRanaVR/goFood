import React, { useState, useEffect } from "react";
import "./Styles/Registration.css";
import registration from "./Images/registration.jpg";
import TypeWriter from "../../ReusableComponents/TypeWriter";
import Button from "../../ReusableComponents/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../backendUrl";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "user",
    orderFood: false,
    listRestaurants: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? "" : "This field is required";
    tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)
      ? ""
      : "Email is not valid";
    tempErrors.phone =
      formData.phone.length == "10" ? "" : "Enter 10 digit phone number";
    tempErrors.address = formData.address ? "" : "This field is required";
    tempErrors.password =
      formData.password.length > 5
        ? ""
        : "Password must be at least 6 characters long";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = { ...formData, role: formData.orderFood ? "user" : "admin" };
      let res = await axios.post(`${backendUrl}/auth/register`, data);
      alert("Successfully registered");
      navigate("/login");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "user",
        orderFood: false,
        listRestaurants: false,
      });
    } catch (error) {
      console.error("Error:", error);
      alert(error.response.data.error);
    }
  }

  return (
    <div className="Registration-Container">
      <div className="text-center">
        <TypeWriter
          textArray={["GOFOOD SIGN UP"]}
          fontSize={window.innerWidth < 600 ? "1.4em" : "2em"}
          color="black"
        />
      </div>

      <div className="Registration-Content-Container">
        <div className="Registration-Form-Container">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="standard"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <TextField
              label="Email"
              variant="standard"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <TextField
              label="Address"
              variant="standard"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <TextField
              label="Phone Number"
              variant="standard"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
            <TextField
              label="Password"
              variant="standard"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px" }}
            />

            <div className="checkbox-registration">
              <input
                type="checkbox"
                name="orderFood"
                checked={formData.orderFood}
                onChange={handleChange}
                sx={{ marginTop: "10px", marginBottom: "10px" }}
              />
              Order Food
            </div>
            <div className="checkbox-registration">
              <input
                type="checkbox"
                name="listRestaurants"
                checked={formData.listRestaurants}
                onChange={handleChange}
                sx={{ marginTop: "20px", marginBottom: "20px" }}
              />
              List My Restaurant
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button text="Register" />
            </div>
          </form>
        </div>
        <div className="Registration-Image-Container">
          <img src={registration} alt="Registration visual representation" />
        </div>
      </div>
    </div>
  );
};
export default Registration;
