import React, { useState, useEffect } from "react";
import "./Styles/Cart.css";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { backendUrl } from "../backendUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [cartDetails, setCartDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));

    if (!userInfo || !userInfo.user || !userInfo.user._id) {
      navigate("/login");
      return;
    }

    getCartDetails();
  }, []);

  async function getCartDetails() {
    let userId = JSON.parse(localStorage.getItem("user_info")).user._id;
    let res = await axios.get(`${backendUrl}/cart/${userId}`);

    if (res.status === 200) {
      setCartList(res.data.items);
      setCartDetails(res.data);
    }
  }

  const updateItemQuantity = (id, change) => {
    const updatedCartList = cartList.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartList(updatedCartList);
    if (cartDetails) {
      axios.post(`${backendUrl}/carts/edit-item/${cartDetails._id}`, {
        items: updatedCartList,
      });
    }
  };

  const handleSizeChange = async (id, newSize) => {
    const updatedCartList = cartList.map((item) => {
      if (item._id === id) {
        return { ...item, selected_size: newSize };
      }
      return item;
    });
    setCartList(updatedCartList);
    if (cartDetails) {
      await axios.post(`${backendUrl}/carts/edit-item/${cartDetails._id}`, {
        items: updatedCartList,
      });
    }
  };

  const removeFromCart = async (productId) => {
    let userId = JSON.parse(localStorage.getItem("user_info")).user._id;
    let res = await axios.post(`${backendUrl}/carts/remove-item`, {
      user: userId,
      productId: productId,
    });
    if (res.status === 200) {
      alert("Product removed");
      getCartDetails();
    }
  };

  return (
    <>
      <h2 style={{ marginLeft: "20px" }}>Cart</h2>
      <div className="cart-container">
        {cartList.length === 0 ? (
          <div className="cart-empty-container">
            <ErrorIcon className="error-icon" />
            <p className="empty-message">
              Sorry, your cart is empty. Please add some items to your cart.
            </p>
          </div>
        ) : (
          cartList.map((item) => (
            <div key={item._id} className="item-card">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="product-image"
                style={{ height: "200px", width: "100%" }}
              />
              <div className="card-content">
                <h5 className="item-name">{item.product.name}</h5>
                <p className="item-price">
                  Price: ₹
                  {
                    item.product.prices.find(
                      (price) => price._id === item.selected_size
                    ).price
                  }
                </p>
                <div className="size-dropdown">
                  <select
                    onChange={(e) => handleSizeChange(item._id, e.target.value)}
                    value={item.selected_size}
                  >
                    {item.product.prices.map((price) => (
                      <option key={price._id} value={price._id}>
                        {price.size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="actions">
                  <div className="quantity-selector">
                    <RemoveIcon
                      onClick={() => updateItemQuantity(item._id, -1)}
                      className="action-icon"
                    />
                    <span className="quantity">{item.quantity}</span>
                    <AddIcon
                      onClick={() => updateItemQuantity(item._id, 1)}
                      className="action-icon"
                    />
                  </div>
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => removeFromCart(item.product._id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartList.length > 0 && (
        <div
          className="Button-Wrapper"
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "40px",
          }}
        >
          <button className="Button-Name" onClick={() => navigate("/checkout")}>
            Order Items
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
