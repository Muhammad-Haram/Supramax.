import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
    });

    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/contact`, formData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("There was an error sending the email!");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className='contact-form-div'>
            <Toaster /> {/* Add Toaster for toast notifications */}
            <h1 className='contact-form-h1'>Send a Message</h1>
            <form className='contact-form-tag' onSubmit={handleSubmit}>
                <div className='contact-form-input-div'>
                    <div className='contact-form-input-div-child'>
                        <label htmlFor="firstName" className='form-label'>First Name</label>
                        <input required name="firstName" type="text" className='contact-form-input' placeholder='First Name' onChange={handleChange} />
                    </div>
                    <div className='contact-form-input-div-child'>
                        <label htmlFor="lastName" className='form-label'>Last Name</label>
                        <input required name="lastName" type="text" className='contact-form-input' placeholder='Last Name' onChange={handleChange} />
                    </div>
                </div>

                <div className='contact-form-input-div-2'>
                    <label htmlFor="businessName" className='form-label'>Business Name</label>
                    <input required name="businessName" type="text" className='contact-form-input' placeholder='Business Name' onChange={handleChange} />
                </div>

                <div className='contact-form-input-div-2'>
                    <label htmlFor="email" className='form-label'>Email Address</label>
                    <input required name="email" type="email" className='contact-form-input-b' placeholder='Email Address' onChange={handleChange} />
                </div>

                <div className='contact-form-input-div-2'>
                    <label htmlFor="phone" className='form-label'>Phone Number</label>
                    <input required name="phone" type="text" className='contact-form-input-b' placeholder='Phone Number' onChange={handleChange} />
                </div>

                <button type='submit' className='submit-button' disabled={isLoading}>
                    {isLoading ? `<p className="loading">Loading...</p>` : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default ContactForm;
