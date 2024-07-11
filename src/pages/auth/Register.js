import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

export default function Register() {
    const { setUserCredentials } = useContext(AppContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const user = {
            id: Date.now(), // generate a unique ID
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            phone: formData.get('phone'),
            street: formData.get('street'),
            number: formData.get('number'),
            city: formData.get('city'),
            zipcode: formData.get('zipcode'),
            lat: formData.get('lat'),
            long: formData.get('long'),
            role: 'user' // Assign a default role
        };

        if (!user.firstname || !user.lastname || !user.email || !user.password) {
            alert('Please fill all the required fields');
            return;
        }

        if (formData.get('password') !== formData.get('confirm_password')) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            console.log(data); // Check the structure of the data

            if (response.ok) {
                handleSuccessfulRegistration(data);
            } else {
                alert('Unable to register: ' + JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Unable to connect to the server');
        }

        handleSuccessfulRegistration(user);
    }

    function handleSuccessfulRegistration(data) {
        setUserCredentials({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            role: data.role,
            email: data.email,
            phone: data.phone,
            street: data.street,
            number: data.number,
            city: data.city,
            zipcode: data.zipcode,
            lat: data.lat,
            long: data.long,
            password: data.password
        });
        storeCredentialsInLocalStorage(data);
        alert('Registration successful! Your account has been registered.');
        navigate('/');
    }

    function storeCredentialsInLocalStorage(credentials) {
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create New Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">First Name *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="firstname" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Last Name *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="lastname" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="email" type="email" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Username *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="username" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Phone</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="phone" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Street</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="street" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Number</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="number" name="number" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">City</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="city" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Zip Code</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="number" name="zipcode" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Password *</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="password" name="password" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Confirm Password *</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="password" name="confirm_password" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Latitude</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="lat" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Longitude</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="long" />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button className="btn btn-primary" type="submit">
                                    Register
                                </button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-outline-primary" to="/auth/login" role="button">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
