import React, { useEffect, useState } from "react";
import "./Styles/Items.css";
import { DataArray } from "./Data";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import ProductCart from "./ProductCart";
const Items = () => {
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  async function getProductList() {
    let res = null;
    if (searchValue.length <= 2) {
      res = await axios.get(`${backendUrl}/get/all/product`);
    } else {
      res = await axios.get(
        `${backendUrl}/products/search?name=${searchValue}`
      );
    }
    if (res.status == 200) {
      console.log(res.data);
      setProductList(res.data);
    }
  }

  useEffect(() => {
    getProductList();
  }, [searchValue]);
  // /products/search?
  return (
    <div className="Items-Container">
      <div className="Items-Container-Seachbar">
        <input
          type="search"
          placeholder="search here ...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="Items-Card-Container">
        {productList.map((item, index) => (
          <ProductCart productData={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Items;
