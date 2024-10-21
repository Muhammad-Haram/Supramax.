import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const Product = ({ item }) => {

  const shortDesc = item.desc.length > 100 ? item.desc.substring(0, 100) : item.desc;

  return (
    <div className="single-product-card">

      <div className="single-product-img">
        <img className="product-card-img" src={item.img} alt="" />
      </div>

      <div className="single-product-content">
        <h1 className="product-card-title">{item.title}</h1>

        <div className="product-card-desc" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(shortDesc) }} />

        <div className="product-card-button-div">
          <Link className="product-card-anchor" to={`/product/${item._id}`} >
            <button className="product-card-button">View More</button>
          </Link>

          <Link className="product-card-anchor">
            <button className="product-card-doc">
              <img src="/img/doc.png" alt="" />
              Product  data sheet
            </button>
          </Link>

        </div>

      </div>

    </div>

  );
};

export default Product;
