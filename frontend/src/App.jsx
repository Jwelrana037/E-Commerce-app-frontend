import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminProductForm from './pages/AdminProductForm';

import AdminLayout from './components/AdminLayout';

import Categories from './pages/Categories';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';


import './App.css';




function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            <Route path="products" element={<AdminProducts />} />

            <Route path="products/new" element={<AdminProductForm />} />

            <Route path="products/:id/edit" element={<AdminProductForm />} />
          </Route>

          <Route path="/categories" element={<Categories />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
        
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
