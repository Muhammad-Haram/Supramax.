import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethod";

const Products = ({ category }) => {

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(category ? `/products?category=${category}` : `/products`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setProduct(res.data);
        console.log("use effect main hon")
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log("use effect main hon")
      }
    };

    getProducts();
  }, [category]);

  return (
    product ? <div className="All-products">

      {product.map((item, index) => (

        <>
          <Product key={index} item={item} />
        </>

      ))}
    </div> : (<div className="notFound"><h1>Not Found</h1></div>)
  );
};

export default Products;
