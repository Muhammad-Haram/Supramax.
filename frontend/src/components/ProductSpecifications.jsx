import DOMPurify from 'dompurify';
import React from 'react';

const ProductSpecifications = ({ product }) => {
    console.log(product)
    return (
        <>
            <h1 className='supramax-h1'>Product Specification</h1>
            <div className='specifications'>
                {product.table ? (
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.table) }} />
                ) : (
                    <p>No specifications available.</p>
                )}
            </div>
        </>
    );
};

export default ProductSpecifications;