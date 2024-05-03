import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { backendUrl } from "../../../backendUrl";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  padding: "20px",
  display: "flex",
  flexDirection: "column",
};

const EditProductModal = ({ open, handleClose, data }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    name: data.name,
    prices: data.prices.map((price) => ({
      size: price.size,
      price: price.price,
    })),
    description: data.description,
    category: data.category._id,
    image: data.image,
    stock: data.stock,
  });

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "size" || name === "price") {
      const newPrices = [...formData.prices];
      newPrices[index][name] = value;
      setFormData({
        ...formData,
        prices: newPrices,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/categories`);
      setCategoryList(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const addPriceField = () => {
    setFormData({
      ...formData,
      prices: [...formData.prices, { size: "", price: "" }],
    });
  };

  const removePriceField = (index) => {
    const newPrices = [...formData.prices];
    newPrices.splice(index, 1);
    setFormData({
      ...formData,
      prices: newPrices,
    });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      ...formData,
      prices: formData.prices.filter((size) => size.size && size.price), // Remove empty size and price fields
      added_by: JSON.parse(localStorage.getItem("user_info")).user._id,
    };
    try {
      const response = await axios.put(
        `${backendUrl}/products/${data._id}`,
        dataToSend
      );
      alert("Product Updated");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </div>
        <TextField
          required
          name="name"
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          variant="standard"
          sx={{ marginBottom: "20px" }}
        />

        {/* Dynamic price fields */}
        {formData.prices.map((priceField, index) => (
          <div key={index} style={{ display: "flex", marginBottom: "20px" }}>
            <TextField
              required
              name="size"
              value={priceField.size}
              label="Size"
              onChange={(e) => handleChange(e, index)}
              variant="standard"
              style={{ marginRight: "10px" }}
            />
            <TextField
              required
              name="price"
              value={priceField.price}
              label="Price"
              onChange={(e) => handleChange(e, index)}
              variant="standard"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removePriceField(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={addPriceField}
          sx={{ marginBottom: "20px" }}
        >
          Add Price
        </Button>

        <TextField
          required
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
          label="Description"
          variant="standard"
          sx={{ marginBottom: "20px" }}
        />

        <InputLabel htmlFor="category">Category:</InputLabel>
        <Select
          value={formData.category}
          onChange={(e) => handleChange(e)}
          input={<Input id="category" />}
          sx={{ marginBottom: "20px" }}
        >
          {categoryList.map((item, index) => (
            <MenuItem value={item._id} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          required
          name="image"
          value={formData.image}
          onChange={(e) => handleChange(e)}
          label="Image URL"
          variant="standard"
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          required
          name="stock"
          value={formData.stock}
          onChange={(e) => handleChange(e)}
          label="Stock"
          variant="standard"
          sx={{ marginBottom: "20px" }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
