import React, { useState, useEffect } from "react";
import { Edit2, ChevronDown, Loader2 } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import api from "../../api/authApi";
import toast from "react-hot-toast";

export default function PersonalInfo() {
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "Male"
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                gender: user.gender || "Male"
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.put("/auth/profile", formData);
            if (res.data.success) {
                // Update context
                setUser(res.data.user); 
                toast.success("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Profile update failed:", err);
            toast.error(err.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Avatar */}
            <div className="relative w-32 h-32 mb-8">
                <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-3xl font-bold border-2 border-white shadow-md uppercase">
                    {user?.name?.charAt(0) || "U"}
                </div>

                <button className="absolute bottom-1 right-1 bg-emerald-700 p-2 rounded-full text-white hover:bg-emerald-800 transition-colors">
                    <Edit2 size={16} />
                </button>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>

                <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        placeholder="Your full name"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-600 block mb-1">Phone Number *</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="Phone"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">Gender *</label>
                    <div className="relative">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-2xl appearance-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <ChevronDown
                            size={20}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-emerald-700 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-700/20 flex items-center gap-2 disabled:bg-gray-400"
                >
                    {isLoading ? <><Loader2 size={18} className="animate-spin" /> Updating...</> : "Update Changes"}
                </button>

            </form>
        </>
    );
}