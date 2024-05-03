import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { backendUrl } from "../../../backendUrl";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const AdminOrder = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState({
    pending: [],
    delivered: [],
    canceled: [],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    let userId = JSON.parse(localStorage.getItem("user_info")).user._id;
    const res = await axios.get(`${backendUrl}/admin/orders/${userId}`);
    const { data } = res;
    const pendingOrders = data.filter((order) => order.status === "pending");
    const deliveredOrders = data.filter(
      (order) => order.status === "delivered"
    );
    const canceledOrders = data.filter((order) => order.status === "cancelled");
    setOrders({
      pending: pendingOrders,
      delivered: deliveredOrders,
      canceled: canceledOrders,
    });
  };
  const handleCancel = async (orderId) => {
    try {
      const res = await axios.put(`${backendUrl}/admin/orders/${orderId}`, {
        status: "cancelled",
      });
      if (res.status === 200) {
        alert(`Order ${orderId} Cancelled`);
        await fetchData();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update status");
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      const res = await axios.put(`${backendUrl}/admin/orders/${orderId}`, {
        status: "delivered",
      });
      if (res.status === 200) {
        alert(`Order ${orderId} marked as delivered`);
        await fetchData();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));

    if (!userInfo || !userInfo.user || !userInfo.user._id) {
      navigate("/login");
      return;
    }
    const adminInfo = sessionStorage.getItem("userRole");

    if (!adminInfo || adminInfo != "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Pending" />
        <Tab label="Delivered" />
        <Tab label="Canceled" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price Per Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.pending.map((order) => {
                const filteredItems = order.orderItems.filter(
                  (item) => item.product !== null
                );
                return filteredItems.map((item, index) => (
                  <TableRow key={`${order._id}-${index}`}>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={filteredItems.length}>
                          {order._id}
                        </TableCell>
                        <TableCell rowSpan={filteredItems.length}>
                          {new Date(order.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>
                          {
                            item.product.prices.find(
                              (price) => price._id === item.selected_size
                            ).size
                          }
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {
                            item.product.prices.find(
                              (price) => price._id === item.selected_size
                            ).price
                          }
                        </TableCell>
                        <TableCell>{`${(
                          item.quantity *
                          item.product.prices.find(
                            (price) => price._id === item.selected_size
                          ).price
                        ).toFixed(2)}`}</TableCell>
                        <TableCell rowSpan={filteredItems.length}>
                          <div>
                            <Button
                              onClick={() => handleDeliver(order._id)}
                              color="primary"
                              variant="contained"
                              sx={{ marginBottom: "5px" }}
                            >
                              Mark Delivered
                            </Button>
                          </div>
                          <div>
                            <Button
                              onClick={() => handleCancel(order._id)}
                              color="error"
                              variant="contained"
                            >
                              Cancel Orders
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price Per Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.delivered.map((order) =>
                order.orderItems
                  .filter((item) => item.product !== null)
                  .map((item, index) => (
                    <TableRow key={`${order._id}-${index}`}>
                      {index === 0 && (
                        <TableCell rowSpan={order.orderItems.length}>
                          {order._id}
                        </TableCell>
                      )}
                      {index === 0 && (
                        <TableCell rowSpan={order.orderItems.length}>
                          {new Date(order.createdAt).toLocaleString()}
                        </TableCell>
                      )}{" "}
                      {index === 0 && (
                        <TableCell rowSpan={order.orderItems.length}>
                          {new Date(order.updatedAt).toLocaleString()}
                        </TableCell>
                      )}
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>
                        {
                          item.product.prices.find(
                            (price) => price._id === item.selected_size
                          ).size
                        }
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {
                          item.product.prices.find(
                            (price) => price._id === item.selected_size
                          ).price
                        }
                      </TableCell>
                      <TableCell>{`${(
                        item.quantity *
                        item.product.prices.find(
                          (price) => price._id === item.selected_size
                        ).price
                      ).toFixed(2)}`}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Canceled Date</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price Per Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.canceled.map((order) =>
                order.orderItems
                  .filter((item) => item.product !== null)
                  .map((item, index) => (
                    <TableRow key={`${order._id}-${index}`}>
                      {index === 0 && (
                        <TableCell rowSpan={order.orderItems.length}>
                          {order._id}
                        </TableCell>
                      )}
                      {index === 0 && (
                        <TableCell rowSpan={order.orderItems.length}>
                          {new Date(order.createdAt).toLocaleString()}
                        </TableCell>
                      )}
                      {index === 0 && (
                        <TableCell rowSpan={order.orderItems.length}>
                          {new Date(order.updatedAt).toLocaleString()}
                        </TableCell>
                      )}
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>
                        {
                          item.product.prices.find(
                            (price) => price._id === item.selected_size
                          ).size
                        }
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {
                          item.product.prices.find(
                            (price) => price._id === item.selected_size
                          ).price
                        }
                      </TableCell>
                      <TableCell>{`${(
                        item.quantity *
                        item.product.prices.find(
                          (price) => price._id === item.selected_size
                        ).price
                      ).toFixed(2)}`}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default AdminOrder;
