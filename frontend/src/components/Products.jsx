import React, { useEffect, useState } from "react";
import Product from "./Product";
import { publicRequest } from "../requestMethod";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProductStart, getProductSuccess, getProductFailure } from "../redux/productSlice";

const Products = ({ category }) => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const { isFetching } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      dispatch(getProductStart());
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
        dispatch(getProductSuccess(res.data));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(getProductFailure());
      }
    };

    getProducts();
  }, [category, dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isFetching ? (
        <p className="mini-loading">Loading...</p>
      ) : product.length ? (
        <>
          <div className="all-product">
            {currentProducts.map((item, index) => (
              <Product key={index} item={item} />
            ))}
          </div>

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
    </>
  );
};

export default Products;
