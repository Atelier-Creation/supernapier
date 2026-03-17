import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

const PasswordUpdateForm = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                {/* Current Password Field */}
                <div className="space-y-2">
                    <label className="block text-gray-800 font-medium">
                        Password <span className="text-gray-600">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrent ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="text-green-800 text-sm font-semibold hover:underline">
                            Forgot Password?
                        </button>
                    </div>
                </div>

                {/* New Password Field */}
                <div className="space-y-2">
                    <label className="block text-gray-800 font-medium">New Password</label>
                    <div className="relative">
                        <input
                            type={showNew ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password Field */}
                <div className="space-y-2">
                    <label className="block text-gray-800 font-medium">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 px-8 py-3 bg-[#1B3C20] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-sm"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default PasswordUpdateForm;