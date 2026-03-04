import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
    { label: 'Product', to: '/products' },
    { label: 'Technology', to: '/blog' },
    { label: 'About Us', to: '/about' },
];

export default function Navbar({ cartCount, onOpenCart }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [imageError, setImageError] = useState(false);
    const location = useLocation();
    const lastScrollY = React.useRef(0);

    const isLanding = location.pathname === '/';

    // Close mobile menu on route change
    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    // Show-after-hero-animation logic
    useEffect(() => {
        if (isLanding) {
            const t = setTimeout(() => setShowNav(true), 5500);
            return () => clearTimeout(t);
        } else {
            setShowNav(true);
        }
    }, [isLanding]);

    // Hide on scroll-down, reveal on scroll-up
    useEffect(() => {
        const onScroll = () => {
            const cur = window.scrollY;
            setIsHidden(cur > lastScrollY.current && cur > 80);
            lastScrollY.current = cur;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const Logo = () =>
        !imageError ? (
            <img
                src="/logo.png"
                alt="Super Napier Logo"
                className="h-12 w-auto"
                onError={() => setImageError(true)}
            />
        ) : (
            <span className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-1">
                Super<span className="text-[#16a34a]">Napier</span>
                <Sprout className="h-5 w-5 text-[#16a34a]" />
            </span>
        );

    return (
        <>
            <motion.nav
                initial={{ y: isLanding ? '-100%' : 0 }}
                animate={{ y: showNav ? (isHidden ? '-100%' : 0) : '-100%' }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
            >
                <div className="max-w-full mx-auto px-6 sm:px-10">
                    <div className="flex items-center justify-between h-18">

                        {/* ── Desktop Left: Nav Links ── */}
                        <div className="hidden lg:flex items-center gap-8 flex-1">
                            {NAV_LINKS.map(({ label, to }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${location.pathname === to
                                            ? 'text-[#1B5E20]'
                                            : 'text-gray-700 hover:text-[#1B5E20]'
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* ── Center: Logo ── */}
                        <Link to="/" className="flex items-center justify-center lg:flex-1">
                            <Logo />
                        </Link>

                        {/* ── Desktop Right: Sign In + Icons ── */}
                        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
                            <Link
                                to="/about"
                                className="text-sm font-semibold text-gray-700 hover:text-[#1B5E20] transition-colors tracking-wide"
                            >
                                Sign In
                            </Link>

                            {/* Search */}
                            <button className="text-gray-600 hover:text-[#1B5E20] transition-colors">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Cart */}
                            <button
                                onClick={onOpenCart}
                                className="relative text-gray-600 hover:text-[#1B5E20] transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Hamburger (desktop) */}
                            {/* <button
                                onClick={() => setMenuOpen(true)}
                                className="text-gray-600 hover:text-[#1B5E20] transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button> */}
                        </div>

                        {/* ── Mobile Right: Hamburger only ── */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="text-gray-700 hover:text-[#1B5E20] transition-colors p-1"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>

                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile / Side Drawer Panel ── */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-black/30 z-[60] backdrop-blur-sm"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Slide-in Panel */}
                        <motion.div
                            key="panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                            className="fixed top-0 right-0 h-full w-72 bg-white z-[70] flex flex-col shadow-2xl"
                        >
                            {/* Close button */}
                            <div className="flex justify-end p-5">
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Nav Links — centered */}
                            <nav className="flex flex-col items-center gap-6 pt-4 px-6">
                                {NAV_LINKS.map(({ label, to }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        onClick={() => setMenuOpen(false)}
                                        className={`text-base font-semibold uppercase tracking-widest transition-colors ${location.pathname === to
                                                ? 'text-[#1B5E20]'
                                                : 'text-gray-800 hover:text-[#1B5E20]'
                                            }`}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div className="border-t border-gray-100 mx-6 mt-8" />

                            {/* Center Logo in panel */}
                            <div className="flex justify-center mt-8">
                                <Link to="/" onClick={() => setMenuOpen(false)}>
                                    <Logo />
                                </Link>
                            </div>

                            {/* Sign In */}
                            <div className="flex justify-center mt-8">
                                <Link
                                    to="/about"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm font-semibold text-gray-700 hover:text-[#1B5E20] transition-colors tracking-wide"
                                >
                                    Sign In
                                </Link>
                            </div>

                            {/* Bottom icons */}
                            <div className="mt-auto border-t border-gray-100 p-6 flex items-center justify-center gap-8">
                                {/* Search */}
                                <button className="text-gray-500 hover:text-[#1B5E20] transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>

                                {/* Cart */}
                                <button
                                    onClick={() => { setMenuOpen(false); onOpenCart(); }}
                                    className="relative text-gray-500 hover:text-[#1B5E20] transition-colors"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>

                                {/* Close / Menu icon */}
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="text-gray-500 hover:text-[#1B5E20] transition-colors"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
