import React, { useState } from "react";
import { Edit2, ChevronDown } from "lucide-react";

export default function PersonalInfo() {

    const [formData, setFormData] = useState({
        firstName: "User",
        lastName: "1",
        email: "user1@gmail.com",
        phone: "9876543210",
        gender: "Male"
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Updated Successfully");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <>
            {/* Avatar */}
            <div className="relative w-32 h-32 mb-8">
                <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                    alt="profile"
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                />

                <button className="absolute bottom-1 right-1 bg-emerald-700 p-2 rounded-full text-white">
                    <Edit2 size={16} />
                </button>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold">First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-2xl"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-2xl"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-2xl"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold">Phone *</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-2xl"
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold">Gender *</label>

                    <div className="relative">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-3 border border-slate-200 rounded-2xl appearance-none"
                        >
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                        </select>

                        <ChevronDown
                            size={20}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </div>
                </div>

                {/* Success Message */}
                {message && (
                    <p className="text-green-600 font-semibold">{message}</p>
                )}

                <button
                    type="submit"
                    className="bg-emerald-700 text-white px-8 py-3 rounded-full"
                >
                    Update Changes
                </button>

            </form>
        </>
    );
}