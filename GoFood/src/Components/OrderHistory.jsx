import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { backendUrl } from "../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
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
      <h2>Order History</h2>
      {orderList.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderHistory;
