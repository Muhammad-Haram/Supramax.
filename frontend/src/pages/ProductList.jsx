import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NavMini from "../components/NavMini";
import ProductBanner from "../components/ProductBanner";
import BreadCrumbs from "../components/BreadCrumbs";

const ProductList = () => {

  const location = useLocation();
  const category = location.pathname.split("/")[2];

  return (
    <div>
      <Navbar />
      <NavMini />
      <ProductBanner heading={category ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Our Products"} />
      <BreadCrumbs/>
      <Products category={category} />
      <Footer />
    </div>
  );
};

export default ProductList;
