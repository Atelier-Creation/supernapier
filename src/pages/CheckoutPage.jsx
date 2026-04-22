import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CircleX, Leaf, ChevronRight, Loader2, CheckCircle2, Tag, Lock, AlertCircle, CreditCard, QrCode, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { orderApi } from '../api/orderApi';
import { QRCodeSVG } from 'qrcode.react';
import { INDIAN_STATES } from '../constants/states';
import api from '../api/authApi';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '../api/cloudinaryApi';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_DUMMY_KEY';

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-all"
        />
    </div>
);

export default function CheckoutPage({ cartItems = [], removeFromCart, clearCart }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        state: 'Tamil Nadu',
        pincode: '',
        country: 'India',
    });

    const [shippingType, setShippingType] = useState('Normal');
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [upiSettings, setUpiSettings] = useState({ vpa: '', businessName: '' });
    const [activeGateway, setActiveGateway] = useState('upi');
    const [freeShippingThreshold, setFreeShippingThreshold] = useState(999);
    const [paymentProof, setPaymentProof] = useState({ screenshot: '', transactionId: '' });
    const [isUploading, setIsUploading] = useState(false);
    const [isProofSubmitting, setIsProofSubmitting] = useState(false);
    const [showUpiModal, setShowUpiModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/settings');
                if (res.data.success) {
                    setUpiSettings(res.data.settings.upiSettings);
                    setActiveGateway(res.data.settings.activePaymentMethod);
                    setFreeShippingThreshold(res.data.settings.freeShippingThreshold || 999);
                    setPaymentMethod(res.data.settings.activePaymentMethod === 'upi' ? 'UPI' : 'online');
                }
            } catch (err) {
                console.error("Failed to fetch shop settings", err);
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                phone: user.phone || prev.phone
            }));

            // Auto-select default address if available
            if (user.addresses && user.addresses.length > 0) {
                const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
                if (defaultAddr && !form.address) {
                    setSelectedAddressId(defaultAddr._id);
                    setForm(prev => ({
                        ...prev,
                        address: defaultAddr.street || '',
                        city: defaultAddr.city || '',
                        state: defaultAddr.state || 'Tamil Nadu',
                        pincode: defaultAddr.pincode || '',
                    }));
                }
            }
        }
    }, [user]);

    const handleFormChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * item.quantity), 0);
    const discount = couponApplied ? subtotal * 0.1 : 0;

    const isTamilNadu = form.state === 'Tamil Nadu';
    const calculateShipping = () => {
        if (subtotal >= freeShippingThreshold) return 0;

        let maxFee = 0;
        cartItems.forEach(item => {
            let fee = 0;
            if (isTamilNadu) {
                fee = shippingType === 'Express' ? (item.shippingExpressTN || 0) : (item.shippingNormalTN || 0);
            } else {
                fee = shippingType === 'Express' ? (item.shippingExpressOutside || 0) : (item.shippingNormalOutside || 0);
            }
            if (fee > maxFee) maxFee = fee;
        });

        if (maxFee === 0 && subtotal < freeShippingThreshold) {
            if (isTamilNadu) return shippingType === 'Express' ? 80 : 50;
            return shippingType === 'Express' ? 150 : 100;
        }

        return maxFee;
    };
    const shipping = calculateShipping();
    const total = subtotal - discount + shipping;

    const VALID_COUPON = 'FARMERWIN';

    const AVAILABLE_COUPONS = [
        { code: 'FARMERWIN', label: '10% OFF', desc: 'Spin Wheel Reward' },
    ];

    const handleApplyCoupon = (code) => {
        const target = (code ?? coupon).trim().toUpperCase();
        if (target === VALID_COUPON) {
            setCoupon(target);
            setCouponApplied(true);
            setCouponError('');
        } else {
            setCouponApplied(false);
            setCouponError('Invalid coupon code.');
        }
    };

    const handleRemoveCoupon = () => {
        setCoupon('');
        setCouponApplied(false);
        setCouponError('');
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const [upiStep, setUpiStep] = useState(1); // 1: Pay, 2: Proof

    // Trigger modal - reset step
    useEffect(() => {
        if (showUpiModal) setUpiStep(1);
    }, [showUpiModal]);

    const baseOrderData = {
        buyer: user?._id,
        buyerDetails: {
            name: form.name,
            email: form.email,
            phone: form.phone
        },
        products: cartItems.map(item => ({
            productId: item._id || item.id,
            weightOptionId: item.weightOptionId || (item.weightOptions?.[0]?._id) || "MISSING",
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            unit: item.unit,
            weight: item.weight
        })),
        shippingAddress: {
            addressLine1: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            country: form.country
        },
        location: `${form.city}, ${form.state}`,
        subtotal,
        discount,
        shippingFee: shipping,
        shippingType,
        total,
        finalAmount: total,
        couponCode: couponApplied ? coupon : ''
    };

    const createUpiOrder = async () => {
        setIsProofSubmitting(true);
        try {
            const upiOrderData = {
                ...baseOrderData,
                paymentMethod: 'UPI',
                paymentStatus: 'awaiting_verification',
                paymentProof: paymentProof
            };

            const res = await orderApi.createOrder(upiOrderData);
            if (res.data.success) {
                if (clearCart) clearCart();
                setShowUpiModal(false);
                navigate('/order-success', {
                    state: {
                        paymentId: paymentProof.transactionId || 'UPI-PENDING',
                        name: form.name,
                        total,
                        message: 'We will call you to confirm the order.'
                    }
                });
            } else {
                throw new Error(res.data.message || 'Failed to create order');
            }
        } catch (err) {
            console.error('Order creation failed:', err);
            toast.error(err.message || 'Failed to create order. Please try again.');
        } finally {
            setIsProofSubmitting(false);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!user) {
            setAuthError('Please login to complete your order.');
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }

        if (cartItems.length === 0) return;

        if (paymentMethod === 'UPI') {
            setShowUpiModal(true);
            return;
        }

        setIsLoading(true);
        // Razorpay logic continues...

        try {
            const rzpOrderRes = await orderApi.createRazorpayOrder(total * 100);
            if (!rzpOrderRes.data.success) throw new Error('Failed to create payment order');

            const rzpOrderId = rzpOrderRes.data.order.id;

            const loaded = await loadRazorpay();
            if (!loaded) {
                toast.error('Payment gateway failed to load. Please check your connection.');
                setIsLoading(false);
                return;
            }

            const options = {
                key: RAZORPAY_KEY_ID,
                amount: Math.round(total * 100),
                currency: 'INR',
                name: 'Super Napier',
                description: `Order for ${cartItems.length} item(s)`,
                image: '/logo.png',
                order_id: rzpOrderId,
                handler: async function (response) {
                    try {
                        await orderApi.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        const finalOrderData = {
                            ...baseOrderData,
                            paymentMethod: 'online',
                            paymentStatus: 'paid',
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                        };

                        await orderApi.createOrder(finalOrderData);

                        if (clearCart) clearCart();
                        navigate('/order-success', {
                            state: {
                                paymentId: response.razorpay_payment_id,
                                name: form.name,
                                total,
                            }
                        });
                    } catch (err) {
                        console.error('Payment verification or order creation failed:', err);
                        toast.error('Something went wrong after payment. Please contact support with payment ID: ' + response.razorpay_payment_id);
                    }
                },
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone,
                },
                theme: { color: '#1B5E20' },
                modal: { ondismiss: () => setIsLoading(false) },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Checkout error:', err);
            toast.error('Failed to initiate checkout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
                <Leaf className="w-16 h-16 text-[#1B5E20]/20 mb-4" />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Add some products before checking out.</p>
                <Link to="/products" className="bg-[#1B5E20] hover:bg-[#5D4037] text-white px-8 py-3 rounded-xl font-bold transition-colors">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-[#FAFCF8] py-10 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link to="/" className="hover:text-[#1B5E20] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/products" className="hover:text-[#1B5E20] transition-colors">Products</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-700 font-semibold">Checkout</span>
                </div>

                {!user && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-8 flex items-center gap-3 text-amber-800">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm">You are checking out as a guest. <Link to="/login" className="font-bold underline">Login</Link> to save your order history.</p>
                    </div>
                )}

                <h1 className="text-3xl md:text-4xl font-black text-[#1B5E20] mb-10 uppercase tracking-tight">
                    Checkout
                </h1>

                <form onSubmit={handlePayment}>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">
                        <div className="space-y-8">
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm font-black">1</span>
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <InputField label="Full Name" id="name" placeholder="e.g. Ramesh Kumar" value={form.name} onChange={handleFormChange('name')} />
                                    </div>
                                    <InputField label="Email Address" id="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleFormChange('email')} />
                                    <InputField label="Phone Number" id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleFormChange('phone')} />
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm font-black">2</span>
                                    Shipping Address
                                </h2>

                                {user?.addresses?.length > 0 && (
                                    <div className="mb-8">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Saved Addresses</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {user.addresses.map((addr) => (
                                                <button
                                                    key={addr._id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedAddressId(addr._id);
                                                        setForm(prev => ({
                                                            ...prev,
                                                            address: addr.street || '',
                                                            city: addr.city || '',
                                                            state: addr.state || 'Tamil Nadu',
                                                            pincode: addr.pincode || '',
                                                        }));
                                                    }}
                                                    className={`text-left p-4 rounded-2xl border-2 transition-all relative ${selectedAddressId === addr._id ? 'border-[#1B5E20] bg-green-50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-black text-gray-900 uppercase tracking-tighter bg-gray-100 px-2 py-0.5 rounded">{addr.label || 'Home'}</span>
                                                        {selectedAddressId === addr._id && <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" />}
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{addr.street}</p>
                                                    <p className="text-xs text-gray-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                </button>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedAddressId(null);
                                                    setForm(prev => ({ ...prev, address: '', city: '', state: 'Tamil Nadu', pincode: '' }));
                                                }}
                                                className={`text-center p-4 rounded-2xl border-2 border-dashed transition-all ${!selectedAddressId ? 'border-[#1B5E20] bg-green-50' : 'border-gray-200 text-gray-400 hover:border-gray-400'}`}
                                            >
                                                <p className="text-sm font-bold">+ New Address</p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <InputField label="Street Address" id="address" placeholder="House No., Street, Area" value={form.address} onChange={handleFormChange('address')} />
                                    </div>
                                    <InputField label="City" id="city" placeholder="e.g. Coimbatore" value={form.city} onChange={handleFormChange('city')} />
                                    <div>
                                        <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1.5">State</label>
                                        <select
                                            id="state"
                                            value={form.state}
                                            onChange={handleFormChange('state')}
                                            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-all"
                                        >
                                            {INDIAN_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                                        </select>
                                    </div>
                                    <InputField label="PIN Code" id="pincode" placeholder="e.g. 641001" value={form.pincode} onChange={handleFormChange('pincode')} />
                                    <InputField label="Country" id="country" placeholder="e.g. India" value={form.country} onChange={handleFormChange('country')} />
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm font-black">3</span>
                                    Shipping Method
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setShippingType('Normal')}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${shippingType === 'Normal' ? 'border-[#1B5E20] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <p className="font-bold text-gray-800">Normal Delivery</p>
                                        <p className="text-xs text-gray-500">3-5 business days</p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShippingType('Express')}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${shippingType === 'Express' ? 'border-[#1B5E20] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <p className="font-bold text-gray-800">Express Delivery</p>
                                        <p className="text-xs text-gray-500">1-2 business days</p>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm font-black">4</span>
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {activeGateway === 'razorpay' && (
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod('online')}
                                                className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${paymentMethod === 'online' ? 'border-[#1B5E20] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                            >
                                                <CreditCard className="w-5 h-5 text-[#1B5E20]" />
                                                <span className="font-bold text-gray-800">Card / NetBanking</span>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('UPI')}
                                            className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${paymentMethod === 'UPI' ? 'border-[#1B5E20] bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                            <QrCode className="w-5 h-5 text-[#1B5E20]" />
                                            <span className="font-bold text-gray-800">UPI (Direct QR)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 lg:sticky lg:top-28">
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={item.image || (Array.isArray(item.images) ? item.images[0] : item.images) || '/placeholder.png'}
                                                    alt={typeof item.name === 'object' ? (item.name?.en || 'Product') : item.name}
                                                    className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                                                />
                                                <span className="absolute -top-2 -right-2 bg-[#1B5E20] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                                                    {typeof item.name === 'object' ? (item.name?.en || 'Product') : item.name}
                                                </p>
                                                <p className="text-xs text-gray-400">{item.weight} {item.unit} ₹{item.price}</p>
                                            </div>
                                            <p className="text-xs font-medium text-green-600">{item.quantity} X ₹{item.price}</p>
                                            <p className="font-bold text-[#5D4037] text-sm flex-shrink-0">
                                                ₹{(Number(item.price || 0) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 mb-5" />
                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                                        <Tag className="w-4 h-4" /> Coupon Code
                                    </label>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            disabled={couponApplied}
                                            onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(''); }}
                                            placeholder="e.g. FARMERWIN"
                                            className="flex-1 rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-all uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                                        />
                                        {couponApplied ? (
                                            <button
                                                type="button"
                                                onClick={handleRemoveCoupon}
                                                className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
                                            >
                                                Remove
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleApplyCoupon()}
                                                className="bg-[#fde047] hover:bg-[#facc15] text-gray-900 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
                                            >
                                                Apply
                                            </button>
                                        )}
                                    </div>
                                    {!couponApplied && (
                                        <div className="mt-3">
                                            <p className="text-xs text-gray-400 mb-2">Available coupons:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {AVAILABLE_COUPONS.map((c) => (
                                                    <button
                                                        key={c.code}
                                                        type="button"
                                                        onClick={() => handleApplyCoupon(c.code)}
                                                        className="group flex items-center gap-2 bg-[#F1F8E9] hover:bg-[#1B5E20] border border-[#1B5E20]/20 hover:border-[#1B5E20] text-[#1B5E20] hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                                                    >
                                                        <Tag className="w-3 h-3" />
                                                        <span className="font-black">{c.code}</span>
                                                        <span className="text-[10px] opacity-70 group-hover:opacity-100">— {c.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {couponApplied && (
                                        <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> 10% discount applied!
                                        </p>
                                    )}
                                    {couponError && (
                                        <p className="text-red-500 text-xs mt-1.5">{couponError}</p>
                                    )}
                                </div>
                                <div className="space-y-2.5 text-sm mb-6">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span>₹{(subtotal || 0).toFixed(2)}</span>
                                    </div>
                                    {couponApplied && (
                                        <div className="flex justify-between text-green-600 font-semibold">
                                            <span>Discount (10%)</span>
                                            <span>- ₹{(discount || 0).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `₹${shipping}`}</span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="text-xs text-gray-400">Free shipping on orders above ₹{freeShippingThreshold}</p>
                                    )}
                                    <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-lg text-gray-900">
                                        <span>Total</span>
                                        <span className="text-[#1B5E20]">₹{(total || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#1B5E20] hover:bg-[#5D4037] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-sm md:text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#1B5E20]/25 hover:shadow-[#5D4037]/25 active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                    ) : (
                                        <><ShieldCheck className="w-5 h-5" /> Pay ₹{(total || 0).toFixed(2)} Securely</>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    <Lock className="w-3.5 h-3.5 text-green-600 inline-block mr-1" /> Payments secured by SuperNapier
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
                <AnimatePresence>
                    {showUpiModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowUpiModal(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col"
                            >
                                {/* Header */}
                                <div className="bg-[#1B5E20] p-5 md:p-6 text-white text-center relative shrink-0">
                                    <button
                                        onClick={() => setShowUpiModal(false)}
                                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <CircleX className="w-6 h-6" />
                                    </button>
                                    <div className="flex justify-center gap-2 mb-3">
                                        <div className={`w-8 h-1 rounded-full transition-all ${upiStep === 1 ? 'bg-white' : 'bg-white/30'}`} />
                                        <div className={`w-8 h-1 rounded-full transition-all ${upiStep === 2 ? 'bg-white' : 'bg-white/30'}`} />
                                    </div>
                                    <h3 className="text-xl font-black">{upiStep === 1 ? 'Step 1: Scan & Pay' : 'Step 2: Submit Proof'}</h3>
                                    <p className="text-sm text-green-100 opacity-80 mt-1">
                                        {upiStep === 1 ? `Pay ₹${total.toFixed(2)} using any UPI app` : 'Upload your payment receipt'}
                                    </p>
                                </div>

                                <div className="p-6 md:p-8">
                                    <AnimatePresence mode="wait">
                                        {upiStep === 1 ? (
                                            <motion.div
                                                key="step1"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: 20, opacity: 0 }}
                                                className="space-y-6"
                                            >
                                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Payable Amount</p>
                                                    <p className="text-3xl font-black text-[#1B5E20]">₹{total.toFixed(2)}</p>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 mb-4">
                                                        <QRCodeSVG
                                                            value={`upi://pay?pa=${upiSettings.vpa}&pn=${encodeURIComponent(upiSettings.businessName)}&am=${total}&cu=INR&tn=Order_Payment`}
                                                            size={150}
                                                        />
                                                    </div>
                                                    <div className="text-center w-full">
                                                        <p className="text-sm font-bold text-gray-800 mb-1">{upiSettings.businessName}</p>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(upiSettings.vpa);
                                                                toast.success("VPA Copied!");
                                                            }}
                                                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-xs text-gray-500 font-mono flex items-center gap-2 mx-auto transition-colors"
                                                        >
                                                            {upiSettings.vpa} <Tag className="w-3 h-3 text-[#1B5E20]" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => setUpiStep(2)}
                                                    className="w-full bg-[#1B5E20] hover:bg-[#5D4037] text-white py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2"
                                                >
                                                    I Have Paid — Next <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="step2"
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -20, opacity: 0 }}
                                                className="space-y-6"
                                            >
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-[10px] font-black text-[#1B5E20] uppercase mb-2 tracking-wider">1. Upload Screenshot</label>
                                                        <div className={`relative group border-2 border-dashed rounded-2xl transition-all ${paymentProof.screenshot ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-[#1B5E20]'}`}>
                                                            {paymentProof.screenshot ? (
                                                                <div className="p-3 flex items-center gap-4">
                                                                    <img src={paymentProof.screenshot} className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm" alt="Proof" />
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-bold text-green-700">Receipt Attached!</p>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setPaymentProof({ ...paymentProof, screenshot: '' })}
                                                                            className="text-xs text-red-500 font-bold hover:underline"
                                                                        >
                                                                            Re-upload
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                                                                    {isUploading ? (
                                                                        <Loader2 className="w-8 h-8 animate-spin text-[#1B5E20]" />
                                                                    ) : (
                                                                        <>
                                                                            <Camera className="w-8 h-8 text-gray-300 group-hover:text-[#1B5E20] transition-colors mb-2" />
                                                                            <span className="text-xs font-bold text-gray-400 group-hover:text-[#1B5E20]">Upload Payment Proof</span>
                                                                        </>
                                                                    )}
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={async (e) => {
                                                                            const file = e.target.files[0];
                                                                            if (!file) return;
                                                                            setIsUploading(true);
                                                                            try {
                                                                                const url = await uploadToCloudinary(file);
                                                                                setPaymentProof({ ...paymentProof, screenshot: url });
                                                                                toast.success("Uploaded!");
                                                                            } catch (err) {
                                                                                toast.error("Error uploading");
                                                                            } finally {
                                                                                setIsUploading(false);
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-black text-[#1B5E20] uppercase mb-2 tracking-wider">2. Transaction ID / UTR</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter 12-digit UTR number"
                                                            value={paymentProof.transactionId}
                                                            onChange={(e) => setPaymentProof({ ...paymentProof, transactionId: e.target.value })}
                                                            className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-base font-bold outline-none focus:ring-4 focus:ring-[#1B5E20]/10 focus:border-[#1B5E20] transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => setUpiStep(1)}
                                                        className="px-6 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={createUpiOrder}
                                                        disabled={!paymentProof.screenshot || !paymentProof.transactionId || isProofSubmitting}
                                                        className="flex-1 bg-[#1B5E20] hover:bg-[#5D4037] disabled:opacity-50 disabled:grayscale text-white py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/10"
                                                    >
                                                        {isProofSubmitting ? (
                                                            <><Loader2 className="w-5 h-5 animate-spin" /> ...</>
                                                        ) : (
                                                            <>Confirm Order</>
                                                        )}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
