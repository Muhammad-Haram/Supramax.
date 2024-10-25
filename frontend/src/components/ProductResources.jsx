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
                    {/* <a href="/img/VIVANCO CAT 6A S_FTP Cable, Shielded.pdf" target="_blank" download="VIVANCO CAT 6A S/FTP Cable, Shielded">click</a> */}

                    <Link to="https://firebasestorage.googleapis.com/v0/b/supramax-48729.appspot.com/o/VIVANCO%20CAT%206A%20S_FTP%20Cable%2C%20Shielded%20(3).pdf?alt=media&token=d51412d4-a61a-47e0-91ce-831b7b42cfe2" download={true}>Download PDF</Link>


                    {/* <button onClick={handleDownload}>Download PDF</button> */}

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
