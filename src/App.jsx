import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import CartDrawer from './components/CartDrawer';
import { AnimatePresence } from 'framer-motion';

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

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800">
        <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} onOpenCart={() => setCartOpen(true)} />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage addToCart={addToCart} />} />
              <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
              <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />

        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
      </div>
    </Router>
  );
}

export default App;
