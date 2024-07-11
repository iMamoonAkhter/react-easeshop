import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './Components/layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import UserProfile from './pages/UserProfile';
import { AppContext } from './AppContext';

import { AdminRoute, AuthenticatedUserRoute } from './Components/authorization';
import UserList from './pages/admin/users/UserList';
import UserDetails from './pages/admin/users/UserDetails';
import Cart from './pages/admin/products/Cart';
import { useCart } from './pages/admin/products/useCart';
import CheckOut from './pages/admin/products/CheckOut';
import ThankYou from './pages/admin/products/ThankYou';
import TrackOrder from './pages/admin/TrackOrder';
import TrackOrderDetails from './pages/admin/TrackOrderDetails';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
    const [userCredentials, setUserCredentials] = useState(getStoredCredentials());
    const { items: cartItems } = useCart();
    function getStoredCredentials() {
        const storedCredentials = localStorage.getItem('userCredentials');
        return storedCredentials ? JSON.parse(storedCredentials) : null;
    }

    useEffect(() => {
        let str = JSON.stringify(userCredentials);
        localStorage.setItem('userCredentials', str);
    }, [userCredentials]);

    return (
        <AppContext.Provider value={{ userCredentials, setUserCredentials }}>
            <BrowserRouter>
                <div className='d-flex flex-column min-vh-100'>
                <Navbar />
                <main className='flex-grow-1'>
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/profile" element={<AuthenticatedUserRoute><UserProfile /></AuthenticatedUserRoute>} />
                    <Route path="/cart" element={<AuthenticatedUserRoute><Cart /></AuthenticatedUserRoute>} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
                    <Route path="/admin/track" element={<AdminRoute><TrackOrder /></AdminRoute>} />
                    <Route path="/admin/track/:id" element={<AdminRoute><TrackOrderDetails /></AdminRoute>} />
                    <Route path="/admin/products/create" element={<AdminRoute><CreateProduct categories={categories} /></AdminRoute>} />
                    <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
                    <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>} />
                    <Route path="/admin/users/details/:id" element={<AdminRoute><UserDetails /></AdminRoute>} />
                    <Route path="/cart" element={<AuthenticatedUserRoute><Cart cartItems={cartItems} /></AuthenticatedUserRoute>} />
                    <Route path="/cart/checkout" element={<AuthenticatedUserRoute><CheckOut /></AuthenticatedUserRoute>} />
                    <Route path="/cart/checkout/orderConfirmation" element={<AuthenticatedUserRoute><ThankYou /></AuthenticatedUserRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </main>
                <Footer />
                </div>

            </BrowserRouter>
        </AppContext.Provider>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="340061270953-5tu1581mt2hkbqc90ta236erov2k3rka.apps.googleusercontent.com">
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </GoogleOAuthProvider>
);

export default App;
