import React, { useEffect, useState } from "react";
import "./Styles/Registration.css";
import registration from "./Images/registration.jpg";
import TypeWriter from "../../ReusableComponents/TypeWriter";
import Button from "../../ReusableComponents/Button";
import { backendUrl } from "../../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    if (name == "orderFood" || name == "listRestaurants")
      setFormData({
        ...formData,
        orderFood: name === "orderFood" ? checked : false,
        listRestaurants: name === "listRestaurants" ? checked : false,
      });
    else {
      setFormData({
        ...formData,
        [name]: val,
      });
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const data = { ...formData, role: formData.orderFood ? "user" : "admin" };
      let res = await axios.post(`${backendUrl}/auth/register`, data);
      alert("successfully registered");
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
          fontSize={windowWidth < 600 ? "1.4em" : "2em"}
          color="black"
        />
      </div>

      <div className="Registration-Content-Container">
        <div className="Registration-Form-Container">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Phone-No"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-registration">
              <input
                type="checkbox"
                name="orderFood"
                checked={formData.orderFood}
                onChange={handleChange}
              />
              Order Food
            </div>
            <div className="checkbox-registration">
              <input
                type="checkbox"
                name="listRestaurants"
                checked={formData.listRestaurants}
                onChange={handleChange}
              />
              List My Restaurant
            </div>
            <div>
              <Button text="Register" />
            </div>
          </form>
        </div>
        <div className="Registration-Image-Container">
          <img src={registration} alt="food delivery boy image ....." />
        </div>
      </div>
    </div>
  );
};

export default Registration;
