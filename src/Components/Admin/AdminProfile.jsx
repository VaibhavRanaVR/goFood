import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { backendUrl } from "../../backendUrl";
import { useNavigate } from "react-router-dom";
const RestaurantProfilePage = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);

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
    fetchRestaurantData();
  }, []);

  const fetchRestaurantData = async () => {
    try {
      let userId = JSON.parse(localStorage.getItem("user_info")).user._id;
      const response = await axios.get(
        `${backendUrl}/restaurant/restaurants/user/${userId}`
      );
      setRestaurant(response.data);
    } catch (error) {
      if (error.response.status == 404) {
        alert(
          "sorry, No restaurant is added in your profile. Please List your restaurant"
        );
        navigate("/admin/create/restaurant");
      }
      console.error("Error fetching restaurant data:", error);
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Restaurant Profile
      </Typography>
      {restaurant && (
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
            padding: "20px",
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              marginTop: "14px",
            }}
          >
            <div>
              <img
                src="https://c8.alamy.com/comp/2FMAGW7/restaurant-logo-vector-illustration-design-template-2FMAGW7.jpg"
                alt="profile image"
                height={300}
              />
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                <b>Restaurant Name:</b> {restaurant.name}
              </Typography>
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                <b>Cuisine:</b> {restaurant.cuisine}
              </Typography>
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                Website: <a href={restaurant.website}>{restaurant.website}</a>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              <b>Restaurant Owner:</b> {restaurant.owner.fullName}
            </Typography>
            <hr />
            <Typography variant="h5" gutterBottom>
              <b>Rating:</b> {restaurant.rating}
            </Typography>
            <hr />
            <Typography variant="h5" gutterBottom>
              <b>Phone No: </b> {restaurant.phone}
            </Typography>{" "}
            <hr />
            <Typography variant="h4" gutterBottom>
              <b>Address</b>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Box ml={2}>
                <Typography variant="h6">
                  <b>Street:</b> {restaurant.address.street}
                </Typography>
                <Typography variant="h6">
                  <b>City:</b> {restaurant.address.city},{" "}
                  {restaurant.address.state}
                </Typography>
                <Typography variant="h6">
                  <b>Zip Code:</b> {restaurant.address.zipCode}
                </Typography>
                <Typography variant="h6">
                  <b>Country:</b> {restaurant.address.country}
                </Typography>
              </Box>
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default RestaurantProfilePage;
