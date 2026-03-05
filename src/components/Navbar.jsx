import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Sprout, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
    { label: 'Product', to: '/products' },
    { label: 'Blogs', to: '/blog' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
];

const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
];

export default function Navbar({ cartCount, onOpenCart }) {
    const [currentLang, setCurrentLang] = useState('en');
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const lastScrollY = useRef(0);

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
            setIsHidden(cur > lastScrollY.current && cur > 100);
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

    const handleLangChange = (langCode) => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
        }
        setCurrentLang(langCode);
        setLangOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchOpen(false);
            setSearchQuery('');
            setMenuOpen(false); // Close mobile menu if open
        }
    };

    const LanguageSwitcher = () => (
        <div className="relative">
            <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-[#1B5E20] transition-colors"
                title="Change Language"
            >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold hidden sm:block uppercase notranslate">{currentLang}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {langOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-2 z-50"
                    >
                        {LANGS.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLangChange(lang.code)}
                                className={`block w-full text-left px-4 py-2 text-sm transition-colors notranslate ${currentLang === lang.code ? 'bg-[#ecf3e1] text-[#1B5E20] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <>
            <motion.nav
                initial={{ y: isLanding ? '-150%' : 0 }}
                animate={{ y: showNav ? (isHidden ? '-150%' : 0) : '-150%' }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-full z-50 bg-white/95 backdrop-blur-md border border-gray-100 rounded-full shadow-md"
            >
                <div className="max-w-full mx-auto px-6 sm:px-10">
                    <div className="flex items-center justify-between h-18">

                        {/* ── Desktop Left: Nav Links ── */}
                        <div className="hidden lg:flex items-center gap-8 flex-1">
                            {NAV_LINKS.map(({ label, to }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    className={`text-md font-semibold tracking-wide capitalize transition-colors duration-200 ${location.pathname === to
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
                            <LanguageSwitcher />

                            <Link
                                to="#"
                                className="text-sm font-semibold text-gray-700 hover:text-[#1B5E20] transition-colors tracking-wide"
                            >
                                Sign In
                            </Link>

                            {/* Search */}
                            <div className="relative flex items-center">
                                <AnimatePresence>
                                    {searchOpen && (
                                        <motion.form
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 200, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onSubmit={handleSearch}
                                            className="overflow-hidden"
                                        >
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onBlur={() => setTimeout(() => setSearchOpen(false), 5000)}
                                                placeholder="Search products..."
                                                className="w-full bg-gray-100 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:ring-0 focus:ring-[#1B5E20]/50"
                                                autoFocus
                                            />
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                                <button
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    className={`text-gray-600 hover:text-[#1B5E20] transition-colors ${searchOpen ? 'ml-2 text-[#1B5E20]' : ''}`}
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>

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
                        <div className="lg:hidden flex items-center gap-4">
                            <LanguageSwitcher />

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
                                {/* Mobile Search */}
                                <div className="relative flex items-center justify-center">
                                    <AnimatePresence>
                                        {searchOpen && (
                                            <motion.form
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: 140, opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                onSubmit={handleSearch}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 overflow-hidden"
                                            >
                                                <input
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    onBlur={() => setTimeout(() => setSearchOpen(false), 5000)}
                                                    placeholder="Search..."
                                                    className="w-full bg-gray-100 border border-gray-200 shadow-sm rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/50"
                                                    autoFocus
                                                />
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                    <button
                                        onClick={() => setSearchOpen(!searchOpen)}
                                        className={`text-gray-500 hover:text-[#1B5E20] transition-colors ${searchOpen ? 'text-[#1B5E20]' : ''}`}
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>

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
