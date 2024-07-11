import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const { setUserCredentials } = useContext(AppContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        // Fetch user data from API
        const userData = await fetchUserData();

        if (userData) {
            // Store fetched user data in localStorage
            storeCredentialsInLocalStorage(userData);

            if (username === userData.username && password === userData.password) {
                handleLoginSuccess(userData);
            } else if (username === 'admin' && password === 'admin') {
                const adminUserData = {
                    id: 1,
                    username: 'admin',
                    role: 'admin',
                };

                handleLoginSuccess(adminUserData);
            } else if (username === 'user' && password === 'user') {
                const regularUserData = {
                    id: 2,
                    username: 'user',
                    role: 'user',
                };

                handleLoginSuccess(regularUserData);
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } else {
            alert('Failed to fetch user data. Please try again later.');
        }
    }

    async function fetchUserData() {
        try {
            const response = await fetch('https://fakestoreapi.com/users/1'); // Adjust the API endpoint as needed
            if (response.ok) {
                const data = await response.json();
                return {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    password: 'user', // Assume password is 'user' for this example; adapt as needed
                    role: 'user',
                };
            } else {
                console.error('Failed to fetch user data:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }

    function handleLoginSuccess(userData) {
        setUserCredentials(userData);
        alert(`Login successful! Welcome back, ${userData.username}.`);
        navigate('/');
    }

    function storeCredentialsInLocalStorage(credentials) {
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
    }

    const handleGoogleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const googleUserData = {
            id: decoded.sub,
            username: decoded.name,
            email: decoded.email,
            role: 'user',
        };
        storeCredentialsInLocalStorage(googleUserData);
        handleLoginSuccess(googleUserData);
        console.log(credentialResponse);
    };

    const handleGoogleLoginError = () => {
        console.log('Google Login Failed');
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-6 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        
                    </form>
                        <hr />
                        <p className='text-center'>OR</p>
                        <div className="text-center mt-4">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleGoogleLoginError}
                            />
                        </div>
                        <hr />
                        <p className="mt-3 text-center">
                            Don't have an account? <Link to="/auth/register">Register here</Link>
                        </p>
                    
                    
                </div>
            </div>
        </div>
    );
}
