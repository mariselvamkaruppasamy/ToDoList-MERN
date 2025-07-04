import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';

const LoginFrom = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', { email, password });
            // const userId = res.data.user._id;
            // localStorage.setItem('userId', userId);
            const { _id, name } = res.data.user;
            localStorage.setItem('userId', _id);
            localStorage.setItem('userName', name);

            alert('Login successful');
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

            </form>
        </div>
    )
}
export default LoginFrom