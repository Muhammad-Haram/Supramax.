import React from 'react'

const ContactForm = () => {
    return (
        <div className='contact-form-div'>
            <h1 className='contact-form-h1'>Send a Message</h1>
            <form className='contact-form-tag'>

                <div className='contact-form-input-div'>
                    <div>
                        <label htmlFor="">First Name</label>
                        <input type="text" className='contact-form-input' placeholder='First Name' />
                    </div>
                    <div>
                        <label htmlFor="">Last Name</label>
                        <input type="text" className='contact-form-input' placeholder='Last Name' />
                    </div>
                </div>

                <div className='contact-form-input-div-2'>
                    <input type="text" />
                </div>

                <div className='contact-form-input-div-2'>
                    <input type="text" />
                </div>

                <div className='contact-form-input-div-2'>
                    <input type="text" />
                </div>

                <button>Submit</button>

            </form>
        </div>
    )
}

export default ContactForm
