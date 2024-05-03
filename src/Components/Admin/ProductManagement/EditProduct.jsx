import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditProductModal from "./EditProductModal";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { backendUrl } from "../../../backendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);

  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}` + "/get/all/product");
      setData(response.data);
      console.log(response.data);
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell align="right">
              <b>Image</b>
            </TableCell>
            <TableCell align="right">
              <b>Category</b>
            </TableCell>
            <TableCell align="right">
              <b>Price</b>
            </TableCell>
            <TableCell align="right">
              <b>Stock</b>
            </TableCell>
            <TableCell align="right">
              <b>Description</b>
            </TableCell>
            <TableCell align="right">
              <b>Edit</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
                <Button onClick={handleOpenModal}>
                  <EditIcon />
                </Button>
                <EditProductModal
                  open={open}
                  handleClose={handleClose}
                  data={row}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditProduct;
