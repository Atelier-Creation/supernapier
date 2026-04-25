import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import CartDrawer from './components/CartDrawer';
import { AnimatePresence } from 'framer-motion';
import ContactUs from './pages/ContactUs';
import PartnershipPage from './pages/PartnershipPage';
import WhatsAppFloatButton from './components/WhatsAppFloatButton';
import ScrollToTop from './components/ScrollToTop';
import SpinWheelPopup from './components/SpinWheelPopup';
import CheckoutPage from './pages/CheckoutPage';
import TermsAndCondition from './pages/TermsAndCondition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundReturnPolicy from './pages/RefundReturnPolicy';
import ProfileLayout from './components/ProfilePage/ProfileLayout';
import PersonalInfo from './components/ProfilePage/PersonalInfo';
import Orders from './components/ProfilePage/Orders';
import AddressManager from './components/ProfilePage/AddressManager';
import PaymentMethods from './components/ProfilePage/PaymentMethods';
import PasswordUpdateForm from './components/ProfilePage/PasswordUpdateForm';
import LogoutPage from './components/ProfilePage/LogoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';

import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import { useCart } from './Context/CartContext';

function MainContent() {
  const { cartItems, addToCart, removeFromCart, clearCart, cartOpen, setCartOpen } = useCart();
  const location = useLocation();
  const noLayoutPaths = ['/login', '/signup', '/forgot-password', '/reset-password', '/partnership'];
  const showLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFCF8] font-sans text-gray-800">
      {showLayout && (
        <Navbar 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onOpenCart={() => setCartOpen(true)} 
        />
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage addToCart={addToCart} />} />
            <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/partnership" element={<PartnershipPage />} />
            <Route path="/terms" element={<TermsAndCondition />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundReturnPolicy />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<PersonalInfo />} />
              <Route path="orders" element={<Orders />} />
              <Route path="address" element={<AddressManager />} />
              <Route path="payment" element={<PaymentMethods />} />
              <Route path="password" element={<PasswordUpdateForm />} />
              <Route path="logout" element={<LogoutPage />} />
            </Route>
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {showLayout && <Footer />}
      <SpinWheelPopup />

      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
      {showLayout && <WhatsAppFloatButton />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ErrorBoundary>
            <Router>
              <Toaster position="top-center" reverseOrder={false} />
              <SEO />
              <ScrollToTop />
              <MainContent />
            </Router>
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
