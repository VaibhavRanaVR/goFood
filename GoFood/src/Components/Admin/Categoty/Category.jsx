import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import EditCategoryModal from "./EditCategoryModal";
import { backendUrl } from "../../../backendUrl";
import axios from "axios";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/categories`);
      setCategoryList(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleEditOpen = (category) => {
    setOpen(true);
    setIsEditable(true);
    setSelectedCategory(category);
  };
  const handleOpen = () => {
    setOpen(true);
    setIsEditable(false);
    setSelectedCategory(null);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          textAlign: "end",
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "5vw",
        }}
      >
        <Button variant="contained" onClick={() => handleOpen()}>
          <b>Add Category</b>
        </Button>
      </div>
      <EditCategoryModal
        open={open}
        isEditable={isEditable}
        onClose={handleClose}
        category={selectedCategory}
      />
      <center>
        <TableContainer component={Paper} sx={{ maxWidth: "90vw" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleEditOpen(item)}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </center>
    </>
  );
};

export default Category;
