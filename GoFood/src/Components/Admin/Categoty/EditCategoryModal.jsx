import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import { backendUrl } from "../../../backendUrl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const EditCategoryModal = ({ open, isEditable, onClose, category }) => {
  const [categoryName, setCategoryName] = React.useState(
    category ? category.name : ""
  );
  const [categoryDescription, setCategoryDescription] = React.useState(
    category ? category.description : ""
  );
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  React.useEffect(() => {
    if (category && isEditable) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
    }
  }, [category, isEditable]);

  const handleEditSave = async () => {
    try {
      if (!categoryName.trim()) {
        setNameError("Category name is required");
        return;
      }
      if (!categoryDescription.trim()) {
        setDescriptionError("Category description is required");
        return;
      }

      const response = await axios.put(
        `${backendUrl}/categories/${category._id}`,
        {
          name: categoryName,
          description: categoryDescription,
        }
      );

      // Check if the response is successful
      if (response.status === 200) {
        alert("Category Edited Successfully");
        onClose(); // Close the modal after saving
      } else {
        throw new Error("Failed to save category");
      }
    } catch (error) {
      console.error("Error while saving category:", error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleAddSave = async () => {
    try {
      if (!categoryName.trim()) {
        setNameError("Category name is required");
        return;
      }
      if (!categoryDescription.trim()) {
        setDescriptionError("Category description is required");
        return;
      }

      const response = await axios.post(`${backendUrl}/categories/`, {
        name: categoryName,
        description: categoryDescription,
      });

      // Check if the response is successful
      if (response.status === 201) {
        // 201 Created
        alert("Category Added Successfully");
        onClose(); // Close the modal after saving
      } else if (response.status === 409) {
        alert("Category with this name already exists");
      } else {
        throw new Error("Failed to save category");
      }
    } catch (error) {
      console.error("Error while saving category:", error.message);
      alert("Category with this name already exists");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ margin: "8px" }}>
          <TextField
            id="category-name"
            label="Category Name"
            variant="outlined"
            required
            fullWidth
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setNameError(""); // Clear the error when user starts typing
            }}
            error={Boolean(nameError)}
            helperText={nameError}
          />
        </div>
        <div style={{ margin: "8px" }}>
          <TextField
            id="category-description"
            label="Description"
            variant="outlined"
            fullWidth
            value={categoryDescription}
            onChange={(e) => {
              setCategoryDescription(e.target.value);
              setDescriptionError(""); // Clear the error when user starts typing
            }}
            error={Boolean(descriptionError)}
            helperText={descriptionError}
          />
        </div>
        <div style={{ textAlign: "center", margin: "8px" }}>
          <Button
            variant="contained"
            onClick={isEditable ? handleEditSave : handleAddSave}
          >
            Save and Exit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditCategoryModal;
