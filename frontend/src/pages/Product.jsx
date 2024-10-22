import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import DOMPurify from 'dompurify';
import NavMini from "../components/NavMini";
// import ConnectTheWorld from "../components/ConnectTheWorld";
// import AboutUs from "../components/AboutUs";
// import Blogs from "../components/Blogs";
import BreadCrumbs from "../components/BreadCrumbs";

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
        setProduct(res.data); // Set the product data from API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getProductDetails();
  }, [id]);

  if (!product) {
    return <p className="loading">Loading...</p>
  }

  console.log(product)

  return (
    <>
      <Navbar />
      <NavMini />
      <BreadCrumbs productTitle={product.title} />
      <div className="product-page">
        <div className="product-page-img">
          <img className="product-page-img-tag" src={product.img} alt={product.title} />
        </div>
        <div className="product-page-content">
          <h1 className="product-page-title">{product.title}</h1>

          <div className="product-desc-div"
            style={{ color: "#575757", marginBottom: "yourDesiredMarginValue" }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.desc) }} />

          <div className="product-page-desc-img">
            {product.productDescImg.map((item) => (
              <img className="product-page-desc-img-tag" key={item} src={item} alt="" />
            ))}
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default Product;
