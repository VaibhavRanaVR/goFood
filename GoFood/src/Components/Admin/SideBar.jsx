import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProductManagement from "./ProductManagement/ProductManagement";
import Category from "./Categoty/Category";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SideBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: "20%" }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Product Management" {...a11yProps(0)} />
          <Tab label="Order Management" {...a11yProps(1)} />
          <Tab label="Revenue" {...a11yProps(2)} />
          <Tab label="Category" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <Box sx={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <ProductManagement />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Order Management
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Revenue
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Category />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default SideBar;
