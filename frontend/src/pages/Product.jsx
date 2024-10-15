import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import DOMPurify from 'dompurify';
import NavMini from "../components/NavMini";
import ConnectTheWorld from "../components/ConnectTheWorld";
import AboutUs from "../components/AboutUs";
import Blogs from "../components/Blogs";

const Product = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <NavMini />
      <div className="product-page">
        <div className="product-page-img">
          <img className="product-page-img-tag" src={product.img} alt="" />
        </div>
        <div className="product-page-content">
          <h1 className="product-page-title">{product.title}</h1>

          <div className="product-info-div">
            <p className="product-info-p"><span className="product-info-span">Part Number:</span>{product.partNumber}</p>
            <p className="product-info-p"><span className="product-info-span">Categories:</span>{product.categories}</p>
            <p className="product-info-p"><span className="product-info-span">Unit:</span>{product.unit}</p>
          </div>

          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.desc) }} />
        </div>
      </div>
      <ConnectTheWorld/>
      <AboutUs/>
      <Blogs/>
      <Footer />
    </>
  );
};

export default Product;
