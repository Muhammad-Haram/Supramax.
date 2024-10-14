import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import NavMini from "../components/NavMini";

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
      <Footer />
    </div>
  );
};

export default ProductList;
