import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import api from '../api/authApi';

export default function SpinWheelPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);
    const [winningCouponCode, setWinningCouponCode] = useState('');
    const [hasSpun, setHasSpun] = useState(() => {
        return localStorage.getItem('hasSpunWheel') === 'true';
    });

    const [isWheelEnabled, setIsWheelEnabled] = useState(true);
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch dynamic spin wheel offers on mount
    useEffect(() => {
        const fetchWheelSettings = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data.success) {
                    setIsWheelEnabled(res.data.settings.isWheelEnabled ?? true);
                    setSegments(res.data.settings.wheelOffers || []);
                }
            } catch (err) {
                console.error("Failed to fetch wheel settings", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWheelSettings();
    }, []);

    // Auto-open after 5 seconds if eligible
    useEffect(() => {
        if (loading || !isWheelEnabled) return;
        const hasSpunBefore = localStorage.getItem('hasSpunWheel') === 'true';
        const hasSeenPopup = sessionStorage.getItem('spinWheelSeen') === 'true';
        
        if (hasSpunBefore || hasSeenPopup) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [loading, isWheelEnabled]);

    // Listen to custom event to manually trigger opening (e.g. from checkout)
    useEffect(() => {
        const handleOpenEvent = () => {
            const hasSpunBefore = localStorage.getItem('hasSpunWheel') === 'true';
            if (!hasSpunBefore && isWheelEnabled) {
                setIsOpen(true);
            }
        };
        window.addEventListener('openSpinWheel', handleOpenEvent);
        return () => window.removeEventListener('openSpinWheel', handleOpenEvent);
    }, [isWheelEnabled]);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('spinWheelSeen', 'true');
    };

    const handleSpin = async () => {
        if (isSpinning || hasSpun || !isWheelEnabled) return;

        setIsSpinning(true);
        setResult(null);
        setWinningCouponCode('');

        try {
            // Request winning offer dynamically from the backend
            const res = await api.post('/settings/spin-wheel');
            if (!res.data.success) {
                throw new Error(res.data.message || "Failed to spin");
            }

            const winningOffer = res.data.offer;
            const winningIndex = segments.findIndex(s => s.id === winningOffer.id);
            const activeIndex = winningIndex >= 0 ? winningIndex : 0;

            const sliceSize = 360 / segments.length;
            const spins = Math.floor(Math.random() * 3) + 5; // 5 to 7 full spins
            const targetAngle = (360 - (activeIndex * sliceSize + sliceSize / 2)) % 360;
            const totalRotation = rotation + (spins * 360) + targetAngle - (rotation % 360);

            setRotation(totalRotation);

            setTimeout(() => {
                setResult(winningOffer.label);
                setIsSpinning(false);

                if (winningOffer.type !== 'none' && winningOffer.couponCode) {
                    setHasSpun(true);
                    setWinningCouponCode(winningOffer.couponCode);
                    localStorage.setItem('hasSpunWheel', 'true');
                    // Store the serialized coupon object
                    localStorage.setItem('wonCoupon', JSON.stringify({
                        code: winningOffer.couponCode,
                        offerId: winningOffer.id
                    }));
                    window.dispatchEvent(new Event('couponWon'));
                } else {
                    if (winningOffer.label !== 'TRY AGAIN') {
                        setHasSpun(true);
                        localStorage.setItem('hasSpunWheel', 'true');
                    }
                }
            }, 15000);

        } catch (err) {
            console.error("Spin failed:", err);
            setIsSpinning(false);
        }
    };

    if (loading || !isWheelEnabled || segments.length === 0) return null;

    const sliceSize = 360 / segments.length;
    // Generate conic gradient for the wheel
    const wheelStyle = {
        background: `conic-gradient(
            ${segments.map((s, i) => `${s.color || '#ffffff'} ${i * sliceSize}deg ${(i + 1) * sliceSize}deg`).join(', ')}
        )`,
        borderRadius: '50%',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-[900px] max-h-[95vh] rounded-[2rem] md:rounded-[3rem] bg-white/95 backdrop-blur-xl shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-hide flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Content / Typography Area */}
                        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 bg-[#FAFCF8]">
                            <div className="hidden md:inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold text-xs sm:text-sm w-fit mb-4 sm:mb-6">
                                <Gift className="w-4 h-4" />
                                <span>Special Offer</span>
                            </div>

                            <h2 className="text-md sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase mb-2 sm:mb-4">
                                Spin & Win <span className="text-amber-500">Rewards!</span>
                            </h2>

                            <p className="text-xs sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-sm">
                                Take a chance on our daily spin wheel to unlock exclusive discounts on your premium Super Napier seeds and more.
                            </p>

                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`border rounded-2xl py-2 px-1 md:p-6 text-center ${!result.includes('LUCK') && !result.includes('AGAIN') ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-200'}`}
                                    >
                                        <p className={`font-medium mb-1 ${!result.includes('LUCK') && !result.includes('AGAIN') ? 'text-green-800' : 'text-red-800'}`}>
                                            {!result.includes('LUCK') && !result.includes('AGAIN') ? 'You Won!' : 'Oops!'}
                                        </p>
                                        <p className={`text-xl md:text-3xl font-black uppercase ${!result.includes('LUCK') && !result.includes('AGAIN') ? 'text-green-900' : 'text-red-900'}`}>{result}</p>
                                        {winningCouponCode ? (
                                            <p className="text-sm text-green-700 mt-2">
                                                Use code <b>{winningCouponCode}</b> at checkout.
                                            </p>
                                        ) : result === 'TRY AGAIN' ? (
                                            <div className="mt-4">
                                                <p className="text-sm text-red-700 mb-3 font-medium">You get a second chance!</p>
                                                <button
                                                    onClick={handleSpin}
                                                    className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-black tracking-wide py-2 px-6 rounded-xl transition-all active:scale-95 shadow-sm uppercase"
                                                >
                                                    Tap to Spin Again
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-red-700 mt-2">Don't worry, try again tomorrow for better luck!</p>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div key="spin-btn" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <button
                                            onClick={handleSpin}
                                            disabled={isSpinning || hasSpun}
                                            className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-black text-lg sm:text-xl py-4 sm:py-5 rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_6px_0_0_#b45309] sm:shadow-[0_8px_0_0_#b45309] hover:translate-y-1 active:shadow-none active:translate-y-2 uppercase tracking-wide"
                                        >
                                            {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL NOW!'}
                                        </button>
                                        <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-4 sm:mt-6 uppercase tracking-wider">
                                            * One spin per session. Terms apply.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Graphic / Wheel Area */}
                        <div className="w-full md:w-1/2 bg-[#166534] relative py-12 sm:p-8 md:p-12 flex items-center justify-center order-1 md:order-2 overflow-hidden min-h-[300px] sm:min-h-[350px]">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-transparent blur-3xl mix-blend-overlay"></div>

                            {/* Wheel Container */}
                            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 select-none">
                                {/* Outer Ring */}
                                <div className="absolute -inset-4 md:-inset-6 bg-amber-400 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] border-8 md:border-[12px] border-amber-600 flex items-center justify-center">
                                    {/* Decorative lights around the ring could go here */}
                                </div>

                                {/* Static Border overlay to stop edge bleeding */}
                                <div className="absolute inset-0 rounded-full border-4 border-white/30 z-10 pointer-events-none"></div>

                                {/* The Rotating Wheel */}
                                <motion.div
                                    className="w-full h-full relative overflow-hidden rounded-full shadow-2xl"
                                    style={{ ...wheelStyle, clipPath: 'circle(50% at 50% 50%)' }}
                                    animate={{ rotate: rotation }}
                                    transition={{ duration: 15, ease: [0.15, 0.8, 0.1, 1] }} // Custom cubic bezier for realistic spin
                                >
                                    {/* Wheel Segments Labels */}
                                    {segments.map((segment, index) => {
                                        const rotationAngle = index * sliceSize + (sliceSize / 2);
                                        return (
                                            <div
                                                key={segment.id || index}
                                                className="absolute inset-0 flex items-start justify-center pointer-events-none pt-[22%]"
                                                style={{
                                                    transform: `rotate(${rotationAngle}deg)`,
                                                }}
                                            >
                                                <span
                                                    className="font-bold text-[10px] md:text-[11px] leading-none uppercase drop-shadow-sm w-max block"
                                                    style={{
                                                        color: segment.textColor || '#000000',
                                                        transform: 'rotate(-90deg)', // Read from center towards the edge
                                                        transformOrigin: 'center center' // Spin around its own center
                                                    }}
                                                >
                                                    {segment.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </motion.div>

                                {/* Center Pin */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full z-20 shadow-xl border-4 border-amber-500 flex items-center justify-center p-1">
                                    <div className="w-full h-full rounded-full border border-gray-200 flex items-center justify-center overflow-hidden bg-white">
                                        <img src="/apple-icon-57x57.png" alt="Super Napier Logo" className="w-[80%] h-[80%] object-contain mix-blend-multiply" />
                                    </div>
                                </div>

                                {/* Pointer Arrow */}
                                <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-xl">
                                    {/* SVG Arrow */}
                                    <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-10 md:w-10 md:h-12">
                                        <path d="M20 50L0 20C0 20 5.37258 0 20 0C34.6274 0 40 20 40 20L20 50Z" fill="#ef4444" />
                                        <path d="M20 45L4 20C4 20 8.5 4 20 4C31.5 4 36 20 36 20L20 45Z" fill="#f87171" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
