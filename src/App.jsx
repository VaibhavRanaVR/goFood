import React, { useState, useEffect } from "react";
import Topbar from "./Components/Topbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./User/Components/Login";
import Cart from "./Components/Cart";
import Items from "./Components/Items";
import OrderHistory from "./Components/OrderHistory";
import ChcekOutProduct from "./Components/ChcekOutProduct";
import AdminPanel from "./Components/Admin/AdminPanel";
import ProductManagement from "./Components/Admin/ProductManagement/ProductManagement";
import Category from "./Components/Admin/Categoty/Category";
import AdminOrder from "./Components/Admin/AdminOrder/AdminOrder";
import RestaurantProfilePage from "./Components/Admin/AdminProfile";
import RestaurantCreationPage from "./Components/Admin/AddRestaurant";
import Registration from "./User/Components/Registration";
import OfflinePage from "./ReusableComponents/OfflinePage";

function App() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const onlineHandler = () => {
      setOnline(true);
    };

    const offlineHandler = () => {
      setOnline(false);
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <>
      <Router>
        {online ? <Topbar /> : <OfflinePage />}
        {/* <Topbar /> */}
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Sign-up" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order/history" element={<OrderHistory />} />
          <Route path="/checkout" element={<ChcekOutProduct />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/profile" element={<RestaurantProfilePage />} />
          <Route
            path="/admin/create/restaurant"
            element={<RestaurantCreationPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
