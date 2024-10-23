import React from 'react'
import { Link } from 'react-router-dom'

const ProductResources = () => {
    return (
        <div>
            <h1 className='supramax-h1'>Resource</h1>

            <div className='resources-div'>
                <div className='resources'>
                    <p className='resources-name'>Product Data Sheet</p>
                    <Link className='resources-img'> <img src='/img/view.png' alt='' />View</Link>
                    <Link className='resources-img'> <img src='/img/down.png' alt='' />Download</Link>
                </div>
                <div className='resources'>
                    <p className='resources-name'>Certificates</p>
                    <Link className='resources-img'> <img src='/img/view.png' alt='' />View</Link>
                    <Link className='resources-img'> <img src='/img/down.png' alt='' />Download</Link>
                </div>
            </div>

        </div>
    )
}

export default ProductResources
