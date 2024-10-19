import React from 'react'

const ContactForm = () => {
    return (
        <div className='contact-form-div'>
            <h1 className='contact-form-h1'>Send a Message</h1>
            <form className='contact-form-tag'>

                <div className='contact-form-input-div'>
                    <div className='contact-form-input-div-child'>
                        <label htmlFor="" className='form-label'>First Name</label>
                        <input type="text" className='contact-form-input' placeholder='First Name' />
                    </div>
                    <div className='contact-form-input-div-child'>
                        <label htmlFor="" className='form-label'>Last Name</label>
                        <input type="text" className='contact-form-input' placeholder='Last Name' />
                    </div>
                </div>

                <div className='contact-form-input-div-2'>
                    <label htmlFor="" className='form-label'>Business Name</label>
                    <input type="text" className='contact-form-input' placeholder='Business Name' />
                </div>

                <div className='contact-form-input-div-2'>
                    <label htmlFor="" className='form-label'>Email Address</label>
                    <input type="text" className='contact-form-input-b' placeholder='Email Address' />
                </div>

                <div className='contact-form-input-div-2'>
                    <label htmlFor="" className='form-label'>Phone Number</label>
                    <input type="text" className='contact-form-input-b' placeholder='Phone Number' />
                </div>

                <button className='submit-button'>Submit</button>

            </form>
        </div>
    )
}

export default ContactForm
