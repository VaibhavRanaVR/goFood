import React, { useState, useEffect } from "react";
import { backendUrl } from "../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CheckoutProduct = () => {
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString(); // Format the date as per locale
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));

    if (!userInfo || !userInfo.user || !userInfo.user._id) {
      navigate("/login");
      return;
    }
    getCartDetails();
  }, []);

  const [cartList, setCartList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  async function getCartDetails() {
    let userInfo = JSON.parse(localStorage.getItem("user_info")).user._id;
    let res = await axios.get(`${backendUrl}/cart/${userInfo}`);

    if (res.status === 200) {
      setCartList(res.data.items);
      calculateSubtotal(res.data.items);
    }
  }
  async function orderItems() {
    let userInfo = JSON.parse(localStorage.getItem("user_info")).user._id;
    let data = {
      user: userInfo,
      status: "pending",
      orderItems: cartList.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        selected_size: item.selected_size,
      })),
    };
    let res = await axios.post(`${backendUrl}/orders/`, data);

    if (res.status === 201) {
      alert("order Done");
      navigate("/order/history");
      await axios.delete(`${backendUrl}/delete/cart/${userInfo}`);
    }
  }

  const calculateSubtotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      let selected_item = item.product.prices.filter(
        (ele) => ele._id == item.selected_size
      );
      total += item.quantity * selected_item[0].price;
    });
    setSubtotal(total.toFixed(2));
  };
  function getPricePerQuantity(item) {
    let selected_item = item.product.prices.filter(
      (ele) => ele._id == item.selected_size
    );
    return selected_item[0].price;
  }
  return (
    <div>
      <center>
        <div className="order-card checkout-product">
          <h3>Check Out Item from Cart</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price per item</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((item) => (
                <tr key={item._id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>Rs {getPricePerQuantity(item)}</td>
                  <td>
                    Rs {(item.quantity * getPricePerQuantity(item)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-details">
            <div className="order-header">
              <div className="format-heading">
                Order placed on: {formatDate()}
              </div>
              <div className="format-heading">
                Method Of Payment: Cash On Delivery
              </div>
              <div className="format-heading">
                Estimated Time Of Delivery : 45 Min
              </div>
            </div>
            <div className="summary">
              <div>Subtotal: Rs {subtotal}</div>
              {/* You can add tax calculation logic here */}
              {/* <div>Tax: Rs {tax}</div> */}
              {/* Total will be subtotal + tax */}
              {/* <div>Total: Rs {total}</div> */}
            </div>
          </div>
          <div
            className="Button-Wrapper"
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button
              className="Button-Name"
              style={{ height: "40px", width: "150px" }}
              onClick={orderItems}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </center>
    </div>
  );
};

export default CheckoutProduct;
