const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Temporary storage for OTPs (you may want to use a database in production)
let otpStorage = {};

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

    // Save OTP with email as the key (in memory storage, replace with database storage in production)
    otpStorage[email] = otp;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password' // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: 'Error sending OTP', error });
        }
        res.status(200).send({ message: 'OTP sent successfully' });
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
