import React from 'react';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ products }) => {
    return (
        <div>
            <h1 className='supramax-h1'>Related Products</h1>
            <div className="related-products">
                {products.slice(0, 5).map((product) => (
                    <div className="single-cate" key={product._id}>
                        <Link className='related-pr-link' to={`/product/${product._id}`} target="_blank" rel="noopener noreferrer">
                            <p className="single-cate-para">{product.title}</p>
                            <img className="single-cate-img" src={product.img} alt={product.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProduct;
