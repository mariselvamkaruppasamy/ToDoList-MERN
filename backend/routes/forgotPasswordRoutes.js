const express = require('express');
const router = express.Router();
const User = require('../models/User');
const transporter = require('../utils/mailer');
const bcrypt = require('bcryptjs');


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60000);

    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    const mailOptions = {
        from: 'mariselvamk22601@gmail.com',
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP to reset password is: ${otp}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).json({ message: 'Email error', error: err });
        res.json({ message: 'OTP sent to your email' });
    });
});

// Reset Password

router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
})

module.exports = router;