import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import DOMPurify from 'dompurify';
import NavMini from "../components/NavMini";
import BreadCrumbs from "../components/BreadCrumbs";
import ProductSpecifications from "../components/ProductSpecifications";
import ProductResources from "../components/ProductResources";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);

        // Fetch related products using the product's category
        const relatedRes = await publicRequest.get(`/products?category=${res.data.categories[0]}`);
        setRelatedProducts(relatedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getProductDetails();
  }, [id]);

  if (!product) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <NavMini />
      <BreadCrumbs productTitle={product.title} />

      <div id="product-details" className="product-page">
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

      <div className="product-page-bar">
        <div className="product-page-bar-link">
          <a href="#product-specifications" className="product-page-bar-single-link">Product Specification</a>
          <a href="#product-resources" className="product-page-bar-single-link">Resource</a>
          <a href="#related-products" className="product-page-bar-single-link">Related Products</a>
        </div>
        <div className="product-page-bar-arrow">
          <a href="#product-details">
            <img className="product-page-bar-arrow-img" src="/img/arrowUp.png" alt="" />
          </a>
        </div>
      </div>

      {product.table && (
        <div id="product-specifications">
          <ProductSpecifications product={product} />
        </div>
      )}

      <div id="product-resources">
        <ProductResources product={product} />
      </div>

      <div id="related-products">
        <RelatedProduct products={relatedProducts} />
      </div>

      <Footer />

    </>
  );
};

export default Product;
