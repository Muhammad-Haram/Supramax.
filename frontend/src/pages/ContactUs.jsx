import React from 'react'
import TopBanner from '../components/TopBanner'
import Navbar from '../components/Navbar'
import NavMini from '../components/NavMini'

const ContactUs = () => {
    return (
        <>
            <Navbar />
            <NavMini />
            <TopBanner heading="Contact Us" />
            <div className='contact-para-div'>
                <p className='contact-para'>
                    Connect with Superamax today. Whether you have questions, suggestions, or just want to share your feedback, we are here to listen.Get in touch with us for any assistance you may need. Your communication is valuable to us.
                </p>
            </div>

            <div className='contactUs-section'>
                
            </div>

        </>
    )
}

export default ContactUs
