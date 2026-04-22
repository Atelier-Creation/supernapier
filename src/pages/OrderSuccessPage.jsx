import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, PhoneCall, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const OrderSuccessPage = () => {
    const location = useLocation();
    const { name, total, paymentId, message } = location.state || {
        name: 'Farmer',
        total: 0,
        paymentId: 'N/A',
        message: 'Your order has been placed successfully.'
    };

    return (
        <div className="min-h-screen bg-[#FAFCF8] py-20 px-4">
            <Helmet>
                <title>Order Success | Super Napier</title>
            </Helmet>

            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle2 className="w-12 h-12 text-[#1B5E20]" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-black text-gray-900 mb-4"
                >
                    Order Placed Successfully!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 text-lg mb-10"
                >
                    Thank you, <span className="font-bold text-[#1B5E20]">{name}</span>. We've received your order and payment verification is in progress.
                </motion.p>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <PhoneCall className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-800">What's Next?</h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {message || 'Our team will call you shortly to confirm the delivery details.'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-800">Order Summary</h3>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400">Total Amount</p>
                            <p className="font-black text-[#1B5E20]">₹{Number(total).toFixed(2)}</p>
                            <p className="text-[10px] text-gray-400 mt-2">ID: {paymentId}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        to="/profile/orders"
                        className="w-full sm:w-auto bg-[#1B5E20] hover:bg-[#5D4037] text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/10"
                    >
                        Track My Order <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        to="/products"
                        className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-black transition-all"
                    >
                        Continue Shopping
                    </Link>
                </motion.div>

                <p className="text-sm text-gray-400 mt-12">
                    A confirmation email has been sent to your registered address.
                </p>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
