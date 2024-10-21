import React from 'react'

const ProductBanner = ({ heading }) => {
    return (
        <div className='productBanner'>
            <h1 className='productBanner-h1'>{heading}</h1>
        </div>
    )
}

export default ProductBanner
