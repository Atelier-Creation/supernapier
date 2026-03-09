import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

const segments = [
    { label: '10% OFF', color: '#fde047', textColor: '#000' },
    { label: 'TRY AGAIN', color: '#166534', textColor: '#fff' },
    { label: 'FLAT ₹300 OFF', color: '#eab308', textColor: '#000' },
    { label: 'NO LUCK', color: '#14532d', textColor: '#fff' },
    { label: '₹1000 OFF NEXT', color: '#facc15', textColor: '#000' },
    { label: 'BETTER LUCK', color: '#15803d', textColor: '#fff' }
];

export default function SpinWheelPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);
    const [hasSpun, setHasSpun] = useState(false);

    // Auto-open after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            // Check if user has already seen/closed it in this session (Disabled for debugging)
            // const hasSeenPopup = sessionStorage.getItem('spinWheelSeen');
            // if (!hasSeenPopup) {
            setIsOpen(true);
            // }
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // sessionStorage.setItem('spinWheelSeen', 'true'); // Commented out for debugging
    };

    const handleSpin = () => {
        if (isSpinning || hasSpun) return;

        setIsSpinning(true);
        setResult(null);

        // Calculate rotation
        // We want to spin multiple times (e.g., 5-8 full rotations) + a random angle
        const spins = Math.floor(Math.random() * 4) + 5; // 5 to 8 spins
        const randomAngle = Math.floor(Math.random() * 360);
        const totalRotation = rotation + (spins * 360) + randomAngle;

        setRotation(totalRotation);

        // Determine the winning segment
        // The pointer is at the top (0 degrees).
        // The wheel rotates clockwise.
        // Each segment is 60 degrees (360 / 6).
        // The final angle modulo 360 tells us how much the wheel is offset.
        // We subtract from 360 because the wheel moves forward, meaning the segments move "past" the pointer.
        setTimeout(() => {
            const normalizedAngle = totalRotation % 360;
            const sliceSize = 360 / segments.length;

            // Calculate which segment is at the top (pointer is at 0 degrees/top center)
            // The wheel rotates clockwise (forward). This means the point on the wheel 
            // that is now at the top is (360 - normalizedAngle).
            const pointAtTop = (360 - normalizedAngle) % 360;

            // Map that point directly to the slice index
            const winningIndex = Math.floor(pointAtTop / sliceSize);
            const winningLabel = segments[winningIndex].label;

            setResult(winningLabel);
            setIsSpinning(false);
            if (winningLabel !== 'TRY AGAIN') {
                setHasSpun(true);
            }
        }, 15000); // Matches the new animation duration of 10s
    };

    // Generate conic gradient for the wheel
    const wheelStyle = {
        background: `conic-gradient(
      ${segments.map((s, i) => `${s.color} ${i * 60}deg ${(i + 1) * 60}deg`).join(', ')}
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
                        className="relative w-full max-w-[900px] rounded-[2rem] md:rounded-[3rem] bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Left Content / Typography Area */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1 bg-[#FAFCF8]">
                            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold text-sm w-fit mb-6">
                                <Gift className="w-4 h-4" />
                                <span>Special Offer</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase mb-4">
                                Spin & Win <span className="text-amber-500">Rewards!</span>
                            </h2>

                            <p className="text-gray-600 mb-8 max-w-sm">
                                Take a chance on our daily spin wheel to unlock exclusive discounts on your premium Super Napier seeds and more.
                            </p>

                            <AnimatePresence mode="wait">
                                {result ? (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`border rounded-2xl p-6 text-center ${result.includes('OFF') ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-200'}`}
                                    >
                                        <p className={`font-medium mb-1 ${result.includes('OFF') ? 'text-green-800' : 'text-red-800'}`}>
                                            {result.includes('OFF') ? 'You Won!' : 'Oops!'}
                                        </p>
                                        <p className={`text-3xl font-black uppercase ${result.includes('OFF') ? 'text-green-900' : 'text-red-900'}`}>{result}</p>
                                        {result.includes('OFF') ? (
                                            <p className="text-sm text-green-700 mt-2">Use code <b>FARMERWIN</b> at checkout.</p>
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
                                            className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-black text-xl py-5 rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_0_0_#b45309] hover:shadow-[0_4px_0_0_#b45309] hover:translate-y-1 active:shadow-none active:translate-y-2 uppercase tracking-wide"
                                        >
                                            {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL NOW!'}
                                        </button>
                                        <p className="text-center text-xs text-gray-400 mt-6 uppercase tracking-wider">
                                            * One spin per session. Terms apply.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Graphic / Wheel Area */}
                        <div className="w-full md:w-1/2 bg-[#166534] relative p-8 md:p-12 flex items-center justify-center order-1 md:order-2 overflow-hidden min-h-[350px]">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-transparent blur-3xl mix-blend-overlay"></div>

                            {/* Wheel Container */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 select-none">
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
                                        // Position labels correctly inside the conic gradient slices
                                        const rotationAngle = index * 60 + 30; // Center of the 60deg slice
                                        return (
                                            <div
                                                key={index}
                                                className="absolute inset-0 flex items-start justify-center pointer-events-none pt-[22%]"
                                                style={{
                                                    transform: `rotate(${rotationAngle}deg)`,
                                                }}
                                            >
                                                <span
                                                    className="font-bold text-[10px] md:text-[11px] leading-none uppercase drop-shadow-sm w-max block"
                                                    style={{
                                                        color: segment.textColor,
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
