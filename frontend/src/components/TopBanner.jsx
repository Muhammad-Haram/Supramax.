import React from 'react'

const TopBanner = ({ heading }) => {
    return (
        <div className='topBanner'>
            <h1 className='topBanner-h1'>{heading}</h1>
        </div>
    )
}

export default TopBanner
