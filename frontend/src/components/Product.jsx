import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';
import DOMPurify from 'dompurify';

const Product = ({ item }) => {
  return (
    <div className="single-product-card">

      <div className="single-product-img">
        <img className="product-card-img" src={item.img} alt="" />
      </div>

      <div className="single-product-content">
        <h1 className="product-card-title">{item.title}</h1>
        <Link className="product-card-anchor" to={`/product/${item._id}`} ><button className="product-card-button"><p>View More</p><Eye className="product-card-eye" /></button></Link>
      </div>

    </div>

  );
};

export default Product;
