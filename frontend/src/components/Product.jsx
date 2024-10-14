import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';
import DOMPurify from 'dompurify';

const Product = ({ item }) => {
  return (

    <div className="product-card">
      <div className="product-card-left">
        <img className="product-card-img" src={item.img} alt="" />
      </div>
      <div className="product-card-right">
        <h1 className="product-card-title">{item.title}</h1>
        <p className="product-card-para"><span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.desc) }} /></p>
        <Link className="product-card-anchor" to={`/product/${item._id}`} ><button className="product-card-button"><p>View More</p><Eye /></button></Link>
      </div>
    </div>

  );
};

export default Product;
