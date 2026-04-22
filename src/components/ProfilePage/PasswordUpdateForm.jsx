import React, { useState } from 'react';
import { EyeOff, Eye, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../../api/authApi';
import toast from 'react-hot-toast';

const PasswordUpdateForm = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (passwords.newPassword !== passwords.confirmPassword) {
            return toast.error("New passwords do not match!");
        }

        if (passwords.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        setIsLoading(true);
        try {
            const res = await api.put("/auth/password", {
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword
            });

            if (res.data.success) {
                toast.success("Password updated successfully!");
                setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (err) {
            console.error("Password update failed:", err);
            toast.error(err.response?.data?.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Current Password Field */}
                <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-sm">
                        Current Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrent ? "text" : "password"}
                            required
                            value={passwords.oldPassword}
                            onChange={e => setPasswords({...passwords, oldPassword: e.target.value})}
                            placeholder="Enter Current Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-gray-400 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showCurrent ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                </div>

                {/* New Password Field */}
                <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-sm">New Password</label>
                    <div className="relative">
                        <input
                            type={showNew ? "text" : "password"}
                            required
                            value={passwords.newPassword}
                            onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                            placeholder="Min. 6 characters"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-gray-400 transition-all"
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
                    <label className="block text-gray-800 font-semibold text-sm">Confirm New Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            required
                            value={passwords.confirmPassword}
                            onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                            placeholder="Repeat New Password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-gray-400 transition-all"
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
                    disabled={isLoading}
                    className="mt-4 px-10 py-3 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition-all duration-200 shadow-lg shadow-emerald-700/20 flex items-center gap-2 disabled:bg-gray-400"
                >
                    {isLoading ? <><Loader2 size={18} className="animate-spin" /> Updating...</> : "Update Password"}
                </button>
            </form>
        </div>
    );
};

export default PasswordUpdateForm;