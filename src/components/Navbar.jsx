import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sprout, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ cartCount, onOpenCart }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [imageError, setImageError] = useState(false);
    const location = useLocation();
    const lastScrollY = React.useRef(0);

    // Check if we are on the landing page
    const isLanding = location.pathname === '/';

    useEffect(() => {
        if (isLanding) {
            // Delay exactly like the Hero animation
            const timer = setTimeout(() => {
                setShowNav(true);
            }, 5500);
            return () => clearTimeout(timer);
        } else {
            setShowNav(true);
        }
    }, [isLanding]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Hide if scrolling down and past the navbar height a bit
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                // Show if scrolling up or near top
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: isLanding ? '-100%' : 0 }}
            animate={{ y: showNav ? (isHidden ? '-100%' : 0) : '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className={`fixed top-0 w-full z-50 ${isLanding ? 'bg-white' : 'bg-white/90 backdrop-blur-md'} border-b border-gray-50`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">

                    {/* Left Links */}
                    <div className="hidden lg:flex space-x-8 flex-1">
                        <Link to="/products" className="text-gray-900 hover:text-[#16a34a] font-bold leading-tight text-sm tracking-wide uppercase">Product</Link>
                        <Link to="/blog" className="text-gray-900 hover:text-[#16a34a] font-bold leading-tight text-sm tracking-wide uppercase">Technology</Link>
                        <Link to="/" className="text-gray-900 hover:text-[#16a34a] font-bold leading-tight text-sm tracking-wide uppercase">About Us</Link>
                    </div>

                    {/* Center Logo */}
                    <Link to="/" className="flex flex-1 justify-center items-center space-x-2">
                        {!imageError ? (
                            <img
                                src="/logo.png"
                                alt="Super Napier Logo"
                                className="h-15 w-auto"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <span className="text-2xl font-black text-gray-900 tracking-tight flex items-center">
                                Super<span className="text-[#16a34a]">Napier</span>
                                <Sprout className="h-6 w-6 text-[#16a34a] ml-1" />
                            </span>
                        )}
                    </Link>

                    {/* Right Section */}
                    <div className="hidden lg:flex flex-1 justify-end items-center space-x-6">
                        {/* <div className="flex items-center space-x-1 cursor-pointer group">
                            <span className="text-gray-900 font-medium text-sm tracking-wide group-hover:text-[#16a34a] transition-colors">Choose Your Region</span>
                            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#16a34a]" />
                        </div> */}

                        <button onClick={onOpenCart} className="relative bg-[#111] hover:bg-black text-white p-4 rounded-tl-lg rounded-br-lg transition-colors shadow-sm cursor-pointer">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* <button className="bg-[#111] hover:bg-black text-white p-3 rounded-lg transition-colors shadow-sm">
                            <Menu className="w-5 h-5" />
                        </button> */}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <button onClick={onOpenCart} className="relative p-2 text-gray-900 border border-gray-200 rounded-lg">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="p-2 text-gray-900 bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white shadow-xl absolute w-full left-0 border-t border-gray-100 p-6 flex flex-col space-y-6">
                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 text-lg font-bold">Product</Link>
                    <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 text-lg font-bold">Technology</Link>
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-900 text-lg font-bold">About Us</Link>
                </div>
            )}
        </motion.nav>
    );
}
