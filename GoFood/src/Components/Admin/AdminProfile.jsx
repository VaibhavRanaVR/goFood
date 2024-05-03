import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { backendUrl } from "../../backendUrl";
import { useNavigate } from "react-router-dom";
const RestaurantProfilePage = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    name: "Khanna khajana",
    owner: {
      fullName: "Himanshu ",
    },
    address: {
      street: "01",
      city: "mumbai",
      zipCode: "1212",
      country: "India",
    },
    phone: "9191919199",
    cuisine: "food",
    rating: 4,
    website: "www.www.www",
  });

  useEffect(() => {
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
    <Container>
      <Typography variant="h3" gutterBottom>
        Restaurant Profile
      </Typography>
      {restaurant && (
        <Grid
          container
          spacing={3}
          sx={{
            backgroundColor: "rgb(232,232,232)",
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
            md={5}
            sx={{
              marginTop: "14px",
            }}
          >
            <div>
              <img
                src="https://www.shutterstock.com/image-vector/man-avatar-profile-picture-vector-260nw-229692004.jpg"
                alt="profile image"
              />
            </div>
            <div>
              <Typography variant="p" gutterBottom>
                <b>Restaurant Name:</b> {restaurant.name}
              </Typography>
            </div>
            <div>
              <Typography variant="p" gutterBottom>
                <b>Cuisine:</b> {restaurant.cuisine}
              </Typography>
            </div>
            <div>
              <Typography variant="body1" gutterBottom>
                Website: <a href={restaurant.website}>{restaurant.website}</a>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="body1" gutterBottom>
                <b>Restaurant Owner:</b> {restaurant.owner.fullName}
              </Typography>
              <hr />
              <Typography variant="body1" gutterBottom>
                <b>Address</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Box ml={2}>
                  <b>Street: </b>
                  {restaurant.address.street}
                  <br />
                  <b>City: </b>
                  {restaurant.address.city}, {restaurant.address.state}
                  <br />
                  <b>Zip Code: </b>
                  {restaurant.address.zipCode}
                  <br />
                  <b>Country: </b>
                  {restaurant.address.country}
                </Box>
              </Typography>
              <hr />
              <Typography variant="body1" gutterBottom>
                <b>Phone No: </b> {restaurant.phone}
              </Typography>
              <hr />
              <Typography variant="body1" gutterBottom>
                <b>Rating:</b> {restaurant.rating}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default RestaurantProfilePage;
