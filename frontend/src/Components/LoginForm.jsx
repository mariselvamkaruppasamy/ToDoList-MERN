import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', { email, password });
            console.log("Login response:", res.data);
            // const userId = res.data.user._id;
            // localStorage.setItem('userId', userId);
            // const { _id, name } = res.data.user;
            // localStorage.setItem('userId', _id);
            // localStorage.setItem('userName', name);
            // localStorage.setItem('token', res.data.token);

            const { message, token, user } = res.data;

            if (!user || !user._id) {
                alert('Login response invalid. Try again.');
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('userName', user.name);


            console.log('Login Message:', message);
            console.log('JWT Token:', token);

            // localStorage.setItem('token', token);
            alert(message);

            // alert('Login successful');
            // localStorage.setItem('userName', res.data.user.name);
            navigate('/home');
        } catch (err) {
            console.error("Login error:", err);
            alert('Login Failed');
        }
    }


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Login Form</h1>
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
                <button type="submit">Login</button>
                <p>Don't have an account? <span><Link to="/signup">Signup Here</Link></span></p>
                <span><Link to="/forgot-password">Forgot?</Link></span>
            </form>
        </div>
    )
}
export default LoginForm