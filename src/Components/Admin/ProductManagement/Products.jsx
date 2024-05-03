import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { backendUrl } from "../../../backendUrl";
import axios from "axios";
import EditProductModal from "./EditProductModal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      let userId = JSON.parse(localStorage.getItem("user_info")).user._id;
      const response = await axios.get(
        `${backendUrl}/restaurant/products/${userId}`
      );
      setData(response.data.products);
    } catch (error) {
      console.log("Error", error);
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

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Stock</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <img src={row.image} alt={row.name} style={{ width: 50 }} />
              </TableCell>
              <TableCell align="right">{row.category.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleOpenModal(row)}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedProduct && (
        <EditProductModal
          open={open}
          handleClose={handleClose}
          data={selectedProduct}
        />
      )}
    </TableContainer>
  );
};

export default Products;
