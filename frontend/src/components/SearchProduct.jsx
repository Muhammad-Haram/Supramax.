import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';

const SearchProduct = ({ item }) => {
    return (
        <div className="single-search-div">

            <div className="single-product-content">
                <Link className="single-search-anchor" to={`/product/${item._id}`} >
                    <h1 className="single-search-title">{item.title}</h1>
                </Link>
                <div className="single-search-detail">
                    <p className="single-search-para">Category: {item.categories}</p>
                    <p className="single-search-para">Part Number: {item.partNumber}</p>
                </div>
            </div>

            <div className="single-search-img">
                <img className="single-search-img-tag" src={item.img} alt="" />
            </div>

        </div>

    );
};

export default SearchProduct;
