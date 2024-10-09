import React from 'react'
import '../style.css'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer>
      <div className='footer-div footer-div2'>
        <img className='footer-logo' src='/img/whiteLogo.png' />
        <p className='footer-para'>is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'C</p>

        <div className='social-icons'>
          <Link to="/"><img src='/img/in.png' /></Link>
          <Link to="/"><img src='/img/fb.png' /></Link>
          <Link to="/"><img src='/img/insta.png' /></Link>
          <Link to="/"><img src='/img/yt.png' /></Link>
        </div>

      </div>

      <div className='footer-div'>
        <h1 className='footer-h1'>Company</h1>

        <div className='footer-links'>
          <Link className="footer-anchor" to="/">About Us</Link>
          <Link className="footer-anchor" to="/products">Products</Link>
          <Link className="footer-anchor" to="/">Solutions</Link>
          <Link className="footer-anchor" to="/">Contact Us</Link>
          <Link className="footer-anchor" to="/">Support</Link>
        </div>

      </div>

      <div className='footer-div'>
        <h1 className='footer-h1'>Our Products</h1>

        <div className='footer-links'>
          <Link className="footer-anchor" to="/">About Us</Link>
          <Link className="footer-anchor" to="/products">Products</Link>
          <Link className="footer-anchor" to="/">Solutions</Link>
          <Link className="footer-anchor" to="/">Contact Us</Link>
          <Link className="footer-anchor" to="/">Support</Link>
        </div>

      </div>

    </footer>
  )
}

export default Footer
