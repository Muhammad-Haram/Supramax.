import React from 'react'
import '../style.css'

const AboutUs2 = () => {
    return (
        <div className='aboutus-section aboutus-section-rev'>
            <div className='aboutus-content'>
                <h1 className='aboutus-h1'>Mission and Vision</h1>
                    <div className='aboutus-para-div'>
                    <p className='aboutus-para-2'>Our stringent commitment to Global standards of Quality has seen us grow phenomenally over the last decade, to create a niche of our own, in the highly competitive world markets. Superamax has been the name of one of the most innovative and leading textile producers. Our technical perfection, quality standards and innovative impacts are unique. Sajid Textile has become one of the leading symbol of quality products in the textile industry.</p>

                    <p className='aboutus-para-2'>Behind all this success, Directors and their team have a complete vision in thier mind to make their organization as one of the top ranked company. Following is our vision statement:</p>

                    <p className='aboutus-para-2'>"To attain market leadership through unmatched quality, a diverse and unique product mix, empowered employees, world-class systems, and the highest ethical and professional standards."</p>

                    <p className='aboutus-para-2'>"Superamax is devoted to achieve consistent improvement in the system of providing products & services to the customers through On Time Delivery & Enhancing Customers Satisfaction by means of Quality and Value."</p>
                    </div>
                <button className='solid-button'>View All</button>
            </div>

            <div className='aboutus-img-div'>
                <img className='aboutus-img' src="/img/about2.png" alt="" />
            </div>
        </div>
    )
}

export default AboutUs2
