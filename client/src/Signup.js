import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(false);
  
    const handleSubmit = (event) => {
        event.preventDefault();

        // Form validation
        const errors = {};
        const minNameLength = 5;
        const nameError = name.length < minNameLength ? 'Name should be at least 5 characters long.' : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = !email.match(emailRegex) ? 'Please enter a valid email address.' : '';
        const phoneRegex = /^\d{10}$/;
        const phoneError = !phone.match(phoneRegex) ? 'Please enter a valid 10-digit phone number.' : '';

        if (nameError || emailError || phoneError) {
            setErrors({
                name: nameError,
                email: emailError,
                phone: phoneError,
            });
            return;
        }

        // If the form passes validation, you can perform further actions (e.g., submit the data to the server).
        // For demonstration purposes, we will log the form data to the console.
        console.log('Form data:', { name, email, phone });

        // Clear the form fields and errors after successful submission
        setName('');
        setEmail('');
        setPhone('');
        setErrors({});

        setAlert(true);
        return;

    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                {errors.phone && <span>{errors.phone}</span>}
            </div>

            <button type="submit">Sign Up</button>
        </form>
        {alert && <SweetAlert
            success
            style={{ display: "block", marginTop: "100px"}}
            title="Good job!"
            onConfirm={() => {setAlert(false)}}
            onCancel={() => {setAlert(false)}}
            confirmBtnBsStyle="info"
        >
            You clicked the button!
        </SweetAlert>}
        </>
    );
};

export default SignupForm;
