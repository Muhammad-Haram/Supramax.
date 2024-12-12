import React from 'react'
import Navbar from '../components/Navbar'
import NavMini from '../components/NavMini'
import AboutUsComponent from '../components/AboutUs'
import AboutUsComponent2 from '../components/AboutUs2'
import Footer from '../components/Footer'
import TopBanner from '../components/TopBanner'

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <NavMini/>
            <TopBanner heading="About Us" />
            <AboutUsComponent />
            <AboutUsComponent2 />
            <Footer />
        </>
    )
}

export default AboutUs
