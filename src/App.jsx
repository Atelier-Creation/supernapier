import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#FAFCF8] font-sans text-gray-800">
        <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setCartOpen(true)} />

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
              <Route path="/terms" element={<TermsAndCondition />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund" element={<RefundReturnPolicy />} />
              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<PersonalInfo />} />
                <Route path="orders" element={<Orders />} />
                <Route path="address" element={<AddressManager />} />
                <Route path="payment" element={<PaymentMethods />} />
                <Route path="password" element={<PasswordUpdateForm />} />
                <Route path="logout" element={<LogoutPage />} />
              </Route>
              <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <SpinWheelPopup />

        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
        <WhatsAppFloatButton />
      </div>
    </Router>
  );
}

export default App;
