import axios from 'axios';
import React, { useState } from 'react'

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setOtpSent(true);
            alert('OTP sent to your email');
        } catch (err) {
            alert('Error sending OTP');
        }
    }

    const resetPassword = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/reset-password', {
                email,
                otp,
                newPassword
            });
            alert('Password reset successful');
        } catch (err) {
            alert('Failed to reset password');
        }
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {!otpSent ? (
                <button onClick={sendOtp}>Send OTP</button>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button onClick={resetPassword}>Reset Password</button>
                </>
            )}
        </div>
    )
}

export default ForgotPassword
