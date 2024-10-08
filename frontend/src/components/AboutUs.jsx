import React from 'react'
import '../style.css'

const AboutUs = () => {
    return (
        <div className='aboutus-section'>
            <div className='aboutus-img-div'>
                <img className='aboutus-img' src="/img/about.png" alt="" />
            </div>

            <div className='aboutus-content'>
                <h1 className='aboutus-h1'>About Supramax</h1>
                <h1 className='aboutus-mini-h1'>We work for you since 2018</h1>
                <p className='aboutus-para'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident,</p>
                <button className='solid-button'>View All</button>
            </div>

        </div>
    )
}

export default AboutUs
