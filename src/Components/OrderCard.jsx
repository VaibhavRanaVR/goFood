import React from "react";
import "./OrderCard.css"; // Ensure this CSS file is updated as shown below
import { useState, useEffect } from "react";

function OrderCard({ order }) {
  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      let selected_item = item.product.prices.filter(
        (ele) => ele._id === item.selected_size
      );
      total += item.quantity * selected_item[0].price;
    });
    setSubtotal(total.toFixed(2));
  };

  function getPricePerQuantity(item) {
    let selected_item = item.product.prices.filter(
      (ele) => ele._id === item.selected_size
    );
    return selected_item[0].price;
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    calculateSubtotal(order.orderItems);
  }, []);

  const getStatusChip = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <span className="chip green">Delivered</span>;
      case "pending":
        return <span className="chip orange">Pending</span>;
      case "canceled":
        return <span className="chip red">Canceled</span>;
      default:
        return <span className="chip gray">{status}</span>;
    }
  };

  return (
    <div className="order-card">
      <div className="table-responsive">
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
            {order.orderItems.map((item) => (
              <tr key={item._id.$oid}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{getPricePerQuantity(item)}</td>
                <td>
                  {(item.quantity * getPricePerQuantity(item)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="order-details">
        <div className="order-header">
          <div>Order ID: {order._id}</div>
          <div>Status:{getStatusChip(order.status)}</div>
          <div>Order placed on: {formatDate(order.createdAt)}</div>
        </div>
        <div className="summary">
          <div>Subtotal: {subtotal}</div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
