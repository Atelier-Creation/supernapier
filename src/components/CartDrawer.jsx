import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose, cartItems, removeFromCart }) {
    const total = cartItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * item.quantity), 0);
    const navigate = useNavigate()
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold flex items-center space-x-3 text-[#1B5E20]">
                                <ShoppingBag />
                                <span>Your Cart</span>
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                                    <ShoppingBag className="w-16 h-16 opacity-20" />
                                    <p className="text-lg">Your cart is empty.</p>
                                    <button onClick={onClose} className="text-[#1B5E20] font-bold hover:underline">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}

                                        className=" flex items-center space-x-4 bg-[#F1F8E9]/50 p-4 rounded-xl border border-gray-100"
                                    >
                                        <img onClick={() => {
                                            onClose();
                                            navigate(`/product/${item.id}`)
                                        }}
                                            src={item.image}
                                            alt={item.name}
                                            className={`cursor-pointer w-20 h-20 ${item.image?.toLowerCase().endsWith('.png') ? 'object-contain' : 'object-cover'} rounded-lg shadow-sm`} />
                                        <div className="flex-1">
                                            <h3
                                                onClick={() => {
                                                    onClose();
                                                    navigate(`/product/${item.id}`)
                                                }}
                                                className="cursor-pointer font-bold text-[#5D4037] line-clamp-1">{item.name}</h3>
                                            <p className="text-[#1B5E20] font-semibold">₹ {(Number(item.price) || 0).toFixed(2)} x {item.quantity}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-100 p-6 bg-gray-50">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="text-3xl font-bold text-[#1B5E20]">₹{(total || 0).toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={onClose}
                                    className="w-full bg-[#1B5E20] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
