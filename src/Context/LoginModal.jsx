import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [isForgot, setIsForgot] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />

            <div className="relative flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl p-3">

                {/* Left Image */}
                <div className="hidden w-1/2 md:block">
                    <img
                        src="https://img.freepik.com/premium-photo/natural-beauty-with-green-rice-fields-indonesia_80375-160.jpg"
                        alt="Rice"
                        className="h-full w-full object-cover rounded-2xl"
                    />
                </div>

                {/* Form Side */}
                <div className="flex w-full flex-col justify-center px-3 py-12 md:w-1/2 lg:px-10">

                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>

                    {/* Title */}
                    <h2 className="mb-2 text-4xl font-bold text-gray-900">
                        {isForgot ? "Forgot Password" : isSignup ? "Sign up" : "Sign in"}
                    </h2>

                    <p className="mb-8 text-gray-600">
                        {isForgot
                            ? "Enter your email to reset your password"
                            : isSignup
                                ? "Create your account to get started"
                                : "Sign in if you have an account"}
                    </p>

                    <form className="space-y-6">

                        {/* Name (Signup) */}
                        {isSignup && !isForgot && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-green-800/20"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Your email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-green-800/20"
                            />
                        </div>

                        {/* Password */}
                        {!isForgot && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl bg-gray-100 px-4 py-3 outline-none focus:ring-2 focus:ring-green-800/20"
                                />

                                {!isSignup && (
                                    <div className="mt-2 text-right">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsForgot(true);
                                                setIsSignup(false);
                                            }}
                                            className="text-sm font-medium text-gray-900 hover:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Button */}
                        <div className="pt-4 text-center">
                            <button
                                type="submit"
                                className="w-full bg-[#fde047] hover:bg-[#facc15] text-black font-semibold text-md py-3 rounded-full transition-colors duration-200"
                            >
                                {isForgot
                                    ? "SEND RESET LINK"
                                    : isSignup
                                        ? "SIGN UP"
                                        : "SIGN IN"}
                            </button>

                            {/* Toggle Links */}
                            {!isForgot && (
                                <p className="mt-6 text-sm text-gray-900">
                                    {isSignup ? "Already have an account?" : "Not a member?"}

                                    <button
                                        type="button"
                                        onClick={() => setIsSignup(!isSignup)}
                                        className="ml-2 font-bold hover:underline"
                                    >
                                        {isSignup ? "Sign in" : "Sign up"}
                                    </button>
                                </p>
                            )}

                            {/* Back to login */}
                            {isForgot && (
                                <p className="mt-6 text-sm text-gray-900">
                                    Remember your password?
                                    <button
                                        type="button"
                                        onClick={() => setIsForgot(false)}
                                        className="ml-2 font-bold hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;