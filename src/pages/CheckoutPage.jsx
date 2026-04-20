import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Leaf, ChevronRight, Loader2, CheckCircle2, Tag, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderApi } from '../api/orderApi';

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
        state: '', 
        pincode: '', 
        country: 'India',
    });

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
                phone: user.phone || prev.phone
            }));
        }
    }, [user]);

    const handleFormChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * item.quantity), 0);
    const discount = couponApplied ? subtotal * 0.1 : 0; 
    const shipping = subtotal > 999 ? 0 : 99;
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

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!user) {
            setAuthError('Please login to complete your order.');
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }

        if (cartItems.length === 0) return;

        setIsLoading(true);
        try {
            // 1. Create Razorpay Order on Backend
            const rzpOrderRes = await orderApi.createRazorpayOrder(total * 100); // in paise
            if (!rzpOrderRes.data.success) throw new Error('Failed to create payment order');
            
            const rzpOrderId = rzpOrderRes.data.order.id;

            // 2. Load and Open Razorpay
            const loaded = await loadRazorpay();
            if (!loaded) {
                alert('Razorpay SDK failed to load. Are you online?');
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
                        // 3. Verify Payment
                        await orderApi.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        // 4. Create Order Record in DB
                        const orderData = {
                            buyer: user._id,
                            buyerDetails: {
                                name: form.name,
                                email: form.email,
                                phone: form.phone
                            },
                            products: cartItems.map(item => ({
                                productId: item.productId,
                                weightOptionId: item.weightOptionId,
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
                            total,
                            finalAmount: total,
                            paymentMethod: 'online',
                            paymentStatus: 'paid',
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            couponCode: couponApplied ? coupon : ''
                        };

                        await orderApi.createOrder(orderData);
                        
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
                        alert('Something went wrong after payment. Please contact support with payment ID: ' + response.razorpay_payment_id);
                    }
                },
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone,
                },
                theme: {
                    color: '#1B5E20',
                },
                modal: {
                    ondismiss: () => setIsLoading(false),
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Checkout error:', err);
            alert('Failed to initiate checkout. Please try again.');
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
                {/* Breadcrumb */}
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

                        {/* ── LEFT: Billing Form ── */}
                        <div className="space-y-8">
                            {/* Personal Info */}
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

                            {/* Shipping Address */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span className="w-7 h-7 bg-[#1B5E20] text-white rounded-full flex items-center justify-center text-sm font-black">2</span>
                                    Shipping Address
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <InputField label="Street Address" id="address" placeholder="House No., Street, Area" value={form.address} onChange={handleFormChange('address')} />
                                    </div>
                                    <InputField label="City" id="city" placeholder="e.g. Coimbatore" value={form.city} onChange={handleFormChange('city')} />
                                    <InputField label="State" id="state" placeholder="e.g. Tamil Nadu" value={form.state} onChange={handleFormChange('state')} />
                                    <InputField label="PIN Code" id="pincode" placeholder="e.g. 641001" value={form.pincode} onChange={handleFormChange('pincode')} />
                                    <InputField label="Country" id="country" placeholder="e.g. India" value={form.country} onChange={handleFormChange('country')} />
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: ShieldCheck, title: 'Secure Payment', desc: 'Razorpay secured & encrypted' },
                                    { icon: Truck, title: 'Fast Shipping', desc: 'Delivered to your doorstep' },
                                    { icon: Leaf, title: 'Quality Seeds', desc: '98%+ germination guaranteed' },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-3 shadow-sm">
                                        <div className="w-10 h-10 rounded-full bg-[#F1F8E9] flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-[#1B5E20]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">{title}</p>
                                            <p className="text-xs text-gray-400">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── RIGHT: Order Summary ── */}
                        <div className="space-y-5 lg:sticky lg:top-28">
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="relative flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                                                <span className="absolute -top-2 -right-2 bg-[#1B5E20] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-gray-400">{item.weight} {item.unit}</p>
                                            </div>
                                            <p className="font-bold text-[#5D4037] text-sm flex-shrink-0">
                                                ₹{(Number(item.price || 0) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 mb-5" />

                                {/* Coupon */}
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

                                    {/* Available Coupon Pills */}
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

                                {/* Price Breakdown */}
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
                                        <p className="text-xs text-gray-400">Free shipping on orders above ₹999</p>
                                    )}
                                    <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-lg text-gray-900">
                                        <span>Total</span>
                                        <span className="text-[#1B5E20]">₹{(total || 0).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#1B5E20] hover:bg-[#5D4037] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#1B5E20]/25 hover:shadow-[#5D4037]/25 active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                    ) : (
                                        <><ShieldCheck className="w-5 h-5" /> Pay ₹{(total || 0).toFixed(2)} Securely</>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-400 mt-4">
                                    <Lock className="w-3.5 h-3.5 text-green-600 inline-block mr-1" /> Payments secured by Razorpay
                                </p>
                            </div>

                            {/* Payment Logos */}
                            <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 mb-3 text-center font-medium">ACCEPTED PAYMENT METHODS</p>
                                <div className="flex items-center justify-center gap-3 flex-wrap">
                                    <img alt="visa" height="26" src="/payment-icon/visa.svg" />
                                    <img alt="mastercard" height="26" src="/payment-icon/master.svg" />
                                    <img alt="upi" height="26" src="/payment-icon/upisvg.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
