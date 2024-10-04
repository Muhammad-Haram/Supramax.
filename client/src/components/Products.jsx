import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
    
const Products = ({ category }) => {

  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category ? `http://localhost:8000/api/products?category=${category}` : `http://localhost:8000/api/products`, {
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
    product ? <Container>
      {product.map((item, index) => (

        <Product key={index} item={item} />

      ))}
    </Container> : (<div className="notFound"><h1>Not Found</h1></div>)
  );
};

export default Products;
