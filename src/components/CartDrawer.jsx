import { useCart } from '../Context/CartContext';
import { Plus, Minus, X, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
    const { 
        cartOpen: isOpen, 
        setCartOpen, 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        isSyncing 
    } = useCart();
    
    const onClose = () => setCartOpen(false);
    const total = cartItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * item.quantity), 0);
    const navigate = useNavigate();

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
                                {isSyncing && <Loader2 size={16} className="animate-spin text-gray-400" />}
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
                                        key={item.dbItemId || item.id}
                                        className="flex items-center space-x-4 bg-[#F1F8E9]/50 p-4 rounded-xl border border-gray-100 group"
                                    >
                                        <div className="relative">
                                            <img 
                                                onClick={() => { onClose(); navigate(`/product/${item.id}`) }}
                                                src={item.image}
                                                alt={item.name}
                                                className={`cursor-pointer w-20 h-20 ${item.image.toLowerCase().endsWith('.png') ? 'object-contain bg-[#eef8ed] p-2' : 'object-cover'} rounded-lg shadow-sm`}
                                                onError={(e) => e.target.src = '/placeholder.png'}
                                            />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                onClick={() => { onClose(); navigate(`/product/${item.id}`) }}
                                                className="cursor-pointer font-bold text-[#5D4037] line-clamp-1 hover:text-[#1B5E20] transition-colors"
                                            >
                                                {item.name}
                                            </h3>
                                            <p className="text-[#1B5E20] font-bold text-sm mb-2">₹{(Number(item.price) || 0).toLocaleString()}</p>
                                            
                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-3 bg-white w-fit rounded-lg border border-gray-100 p-1">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-50 rounded text-gray-500"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-50 rounded text-[#1B5E20]"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.dbItemId || item.id, !!item.dbItemId)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
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
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-[#1B5E20]">₹{(total || 0).toLocaleString()}</span>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Shipping calculated at checkout</p>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={onClose}
                                    className="w-full bg-[#1B5E20] hover:bg-[#5D4037] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center transform hover:scale-[1.02] active:scale-95"
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
