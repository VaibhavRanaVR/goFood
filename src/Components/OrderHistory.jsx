import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { backendUrl } from "../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrderDetails() {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));

        if (!userInfo || !userInfo.user || !userInfo.user._id) {
          navigate("/login");
          return;
        }

        let userId = userInfo.user._id;
        let res = await axios.get(`${backendUrl}/orders/${userId}`);

        if (res.status === 200) {
          setOrderList(res.data.orders);
          setLoading(false);
          console.log(res.data.orders);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }

    getOrderDetails();
  }, [navigate]);

  return (
    <div>
      <h2 style={{ marginLeft: "20px" }}>Order History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orderList.length === 0 ? (
        <div className="cart-empty-container">
          <ErrorIcon className="error-icon" />
          <p className="empty-message">Sorry, No Order Found.</p>
        </div>
      ) : (
        orderList.map((order, index) => <OrderCard key={index} order={order} />)
      )}
    </div>
  );
};

export default OrderHistory;
