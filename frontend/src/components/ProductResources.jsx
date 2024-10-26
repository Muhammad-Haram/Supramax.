import React from 'react'
import { Link } from 'react-router-dom'

const ProductResources = ({ product }) => {
    return (
        <div>
            <h1 className='supramax-h1'>Resource</h1>

            <div className='resources-div'>
                <div className='resources'>

                    <p className='resources-name'>Product Data Sheet</p>
                    <Link target="_blank" to={product.dataSheet} className='resources-img'> <img src='/img/view.png' alt='' />View And Download</Link>

                </div>
                <div className='resources'>
                    <p className='resources-name'>Certificates</p>

                    <Link target="_blank" to={product.certificate} className='resources-img'> <img src='/img/view.png' alt='' />View And Download</Link>

                </div>
            </div>

        </div>
    )
}

export default ProductResources