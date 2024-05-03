import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import { backendUrl } from "../../backendUrl";
import { useNavigate } from "react-router-dom";
const RestaurantCreationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    cuisine: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "Required";
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/restaurant/create/restaurants`,
        {
          ...formData,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zipCode: formData.zipCode,
          },
          owner: JSON.parse(localStorage.getItem("user_info")).user._id,
        }
      );
      alert("Restaurant created successfully");
      navigate("/admin/profile");
    } catch (error) {
      console.error("Error creating restaurant:", error);
      if (error.response.status == 409) {
        alert("You have already added a restaurant");
      } else {
        alert("Unable to add restaurant");
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Restaurant
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Restaurant Name"
              variant="standard"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="street"
              label="Street"
              variant="standard"
              fullWidth
              value={formData.street}
              onChange={handleChange}
              error={Boolean(errors.street)}
              helperText={errors.street}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              variant="standard"
              fullWidth
              value={formData.city}
              onChange={handleChange}
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="state"
              label="State"
              variant="standard"
              fullWidth
              value={formData.state}
              onChange={handleChange}
              error={Boolean(errors.state)}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="zipCode"
              label="Zip Code"
              variant="standard"
              fullWidth
              value={formData.zipCode}
              onChange={handleChange}
              error={Boolean(errors.zipCode)}
              helperText={errors.zipCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="country"
              label="Country"
              variant="standard"
              fullWidth
              value={formData.country}
              onChange={handleChange}
              error={Boolean(errors.country)}
              helperText={errors.country}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone Number"
              variant="standard"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="cuisine"
              label="Cuisine Type"
              variant="standard"
              fullWidth
              value={formData.cuisine}
              onChange={handleChange}
              error={Boolean(errors.cuisine)}
              helperText={errors.cuisine}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="website"
              label="Website"
              variant="standard"
              fullWidth
              value={formData.website}
              onChange={handleChange}
              error={Boolean(errors.website)}
              helperText={errors.website}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Restaurant
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RestaurantCreationPage;
