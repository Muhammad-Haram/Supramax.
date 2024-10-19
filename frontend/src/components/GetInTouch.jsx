import React from 'react'

const GetInTouch = () => {
    return (
        <div className='getInTouch-div'>
            <h1 className='contact-form-h1'>Get in touch</h1>

            <h1 className='getInTouch-h1'>
                Let's discuss your needs.
            </h1>

            <p className='getInTouch-para'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>

            <div className='info-box'>
                <span className='info-box-logo'>
                    <img src="/img/location.png" alt="" />
                </span>
                <div className='info-box-detail'>
                    <p className='info-box-head'>
                        Address
                    </p>
                    <p className='info-box-para'>
                        3001 Progress St., Dover, OH 44622
                    </p>
                </div>
            </div>

            <div className='info-box'>
                <span className='info-box-logo'>
                    <img src="/img/phone.png" alt="" />
                </span>
                <div className='info-box-detail'>
                    <p className='info-box-head'>
                        Phone
                    </p>
                    <p className='info-box-para'>
                        330-343-4456
                    </p>
                </div>
            </div>

            <div className='info-box'>
                <span className='info-box-logo'>
                    <img src="/img/mail.png" alt="" />
                </span>
                <div className='info-box-detail'>
                    <p className='info-box-head'>
                        Email
                    </p>
                    <p className='info-box-para'>
                        sales@snyderman.com
                    </p>
                </div>
            </div>

            <hr className='info-box-hr' />

            <div className='contactus-social-icons'>
                <h1 className='follow-us'>Follow Us</h1>
                <div className='contactus-social-icon-div'>
                    <img src="/img/facebook.png" alt="" />
                    <img src="/img/instagram.png" alt="" />
                    <img src="/img/linkedin.png" alt="" />
                    <img src="/img/youtube.png" alt="" />
                </div>
            </div>

        </div>
    )
}

export default GetInTouch
