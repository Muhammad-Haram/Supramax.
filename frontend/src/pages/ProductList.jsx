import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NavMini from "../components/NavMini";
import ConnectTheWorld from "../components/ConnectTheWorld";
import AboutUs from "../components/AboutUs";
import Blogs from "../components/Blogs";

const ProductList = () => {

  const location = useLocation();
  const category = location.pathname.split("/")[2];

  return (
    <div>
      <Navbar />
      <NavMini/>
      <div className="category-heading-div">
        <h1 className="category-heading-h1">{

          category ? category.toUpperCase() : "All-Products"

        }</h1>
      </div>
      <Products category={category} />
      <ConnectTheWorld/>
      <AboutUs/>
      <Blogs/>
      <Footer />
    </div>
  );
};

export default ProductList;
