import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethod";
import Pagination from "./Pagination";  // Import the Pagination component

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`;

const Products = ({ category }) => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);  // Show 6 products per page

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/products?category=${category}` : `/products`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getProducts();
  }, [category]);

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {product.length ? (
        <>
          <ProductsContainer>
            {currentProducts.map((item, index) => (
              <Product key={index} item={item} />
            ))}
          </ProductsContainer>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(product.length / productsPerPage)}
            onPageChange={paginate}
          />
        </>
      ) : (
        <div className="notFound">
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  );
};

export default Products;
