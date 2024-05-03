import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { backendUrl } from "../../../backendUrl";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    stock: "",
    sizes: [{ size: "", price: "" }],
  });

  const [categoryList, setCategoryList] = useState([]);
  const [errors, setErrors] = useState({});

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

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newSizes = [...formData.sizes];
    newSizes[index][name] = value;
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };

  const addSizeField = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: "", price: "" }],
    });
  };

  const removeSizeField = (index) => {
    const newSizes = [...formData.sizes];
    newSizes.splice(index, 1);
    setFormData({
      ...formData,
      sizes: newSizes,
    });
  };

  const handleSubmit = async () => {
    // Validate form data
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      validationErrors.description = "Description is required";
    }
    if (!formData.category) {
      validationErrors.category = "Category is required";
    }
    if (!formData.image.trim()) {
      validationErrors.image = "Image URL is required";
    }
    if (!formData.stock.trim()) {
      validationErrors.stock = "Stock is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Prepare data to send to the backend
      const dataToSend = {
        ...formData,
        prices: formData.sizes.filter((size) => size.size && size.price),
        added_by: JSON.parse(localStorage.getItem("user_info")).user._id,
      };
      try {
        const response = await axios.post(`${backendUrl}/products`, dataToSend);
        alert("Product Added");
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  return (
    <Box component="form">
      <div className="m-3 w-50">
        <TextField
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          variant="standard"
          sx={{ width: "100%" }}
          error={!!errors.name}
          helperText={errors.name}
        />
      </div>

      {/* Dynamic size and price fields */}
      {formData.sizes.map((sizeField, index) => (
        <div key={index}>
          <div className="m-3 w-50">
            <TextField
              id={`size${index}`}
              name="size"
              value={sizeField.size}
              label="Size"
              variant="standard"
              onChange={(e) => handleChange(e, index)}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="m-3 w-50">
            <TextField
              id={`price${index}`}
              name="price"
              value={sizeField.price}
              label="Price"
              variant="standard"
              onChange={(e) => handleChange(e, index)}
              sx={{ width: "100%" }}
            />
          </div>
          <div className="m-3 w-50">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeSizeField(index)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="m-3 w-50">
        <Button variant="contained" color="primary" onClick={addSizeField}>
          Add Size
        </Button>
      </div>

      <div className="m-3 w-50">
        <TextField
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          variant="standard"
          sx={{ width: "100%" }}
          error={!!errors.description}
          helperText={errors.description}
        />
      </div>

      <div className="m-3 w-50">
        <TextField
          id="image"
          name="image"
          label="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          variant="standard"
          sx={{ width: "100%" }}
          error={!!errors.image}
          helperText={errors.image}
        />
      </div>

      <div className="m-3 w-50">
        <TextField
          id="stock"
          name="stock"
          label="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          variant="standard"
          sx={{ width: "100%" }}
          error={!!errors.stock}
          helperText={errors.stock}
        />
      </div>

      <div className="m-3 w-50">
        <InputLabel htmlFor="category">Category:</InputLabel>
        <Select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          fullWidth
          error={!!errors.category}
          helperText={errors.category}
        >
          {categoryList.map((item, index) => (
            <MenuItem value={item._id} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </div>

      {/* Submit button */}
      <div className="m-3 w-50">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default AddProduct;
