import axios from 'axios';
import React, { useState } from 'react'
import './SignupForm.css'
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            alert('Please Enter your name..');
            return;
        }

        if (password.length <= 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert('Password Missmatch..');
            return;
        }

        const userDetails = {
            name,
            email,
            password
        }

        console.log(userDetails);
        try {
            await axios.post('http://localhost:5000/api/signup', userDetails);
            alert('Signup Successfully..');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('')
            navigate('/home');
        } catch (err) {
            console.log("Error adding todo", err);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup}>
                <h1>SignUp Form</h1>
                <input
                    type="text"
                    placeholder='Full Name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder='Email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default SignupForm
