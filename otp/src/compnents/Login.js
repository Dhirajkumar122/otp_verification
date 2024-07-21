import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 

const OTPForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const sendOTP = async () => {
        try {
            const response = await axios.post('http://localhost:3001/send-otp', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container">
            <h2>Enter your email to receive OTP</h2>
            <input
                className="input-field"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button" onClick={sendOTP}>Send OTP</button>
            <p className="message">{message}</p>
        </div>
    );
};

export default OTPForm;
