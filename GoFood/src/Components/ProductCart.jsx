import React, { useState } from "react";
import "./ProductCard.css"; // Make sure this CSS file has the necessary styles
import axios from "axios";
import { backendUrl } from "../backendUrl";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ productData }) => {
  const [selectedSize, setSelectedSize] = useState(productData.prices[0]);
  const navigate = useNavigate();
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  const addToCart = async (item) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user_info"));

      if (!userInfo || !userInfo.user || !userInfo.user._id) {
        navigate("/login");
        return;
      }

      const res = await axios.post(`${backendUrl}/carts/`, {
        user: userInfo.user._id,
        product: item._id,
        quantity: 1,
        selected_size: selectedSize._id,
      });
      if (res.status === 201) {
        alert("Item added to cart");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        console.error("Error:", error);
        alert("Failed to add item to cart");
      }
    }
  };
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={productData.image} alt={productData.name} />
        <span className="product-type-class-veg">Veg</span>
      </div>
      <div className="product-favorite">
        <button className="favorite-button">❤️</button>
      </div>
      <div className="product-info">
        <h3>{productData.name}</h3>
        <p>{productData.description}</p>
      </div>
      <div className="product-selection">
        {productData.prices.map((price) => (
          <span
            key={price._id}
            className={`product-selection-option ${
              selectedSize._id === price._id ? "product-selection-active" : ""
            }`}
            onClick={() => handleSizeSelection(price)}
          >
            {price.size}
          </span>
        ))}
      </div>
      <div className="product-pricing">
        <p>Price: ${selectedSize.price}</p>
      </div>
      <button
        className="add-to-cart-button"
        onClick={() => addToCart(productData)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
