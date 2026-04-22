import React, { useState, useEffect } from "react";
import { ChevronDown, Loader2, MapPin, Trash2, Plus } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import api from "../../api/authApi";
import toast from "react-hot-toast";

const AddressManager = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
      label: "Home",
      street: "",
      city: "",
      state: "Tamil Nadu",
      pincode: ""
  });

  useEffect(() => {
    if (user?.addresses) {
        setAddresses(user.addresses);
    }
  }, [user]);

  const saveAddresses = async (newList) => {
    setIsLoading(true);
    try {
        const res = await api.put("/auth/profile", { addresses: newList });
        if (res.data.success) {
            setUser(res.data.user);
            toast.success("Address book updated!");
        }
    } catch (err) {
        console.error("Address save failed:", err);
        toast.error("Failed to update addresses");
    } finally {
        setIsLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // Create new address without an ID for the backend
    const newEntry = { ...formData };
    const updated = [...addresses, newEntry];
    
    await saveAddresses(updated);
    setFormData({ label: "Home", street: "", city: "", state: "Tamil Nadu", pincode: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this address?")) return;
    const updated = addresses.filter(a => a._id !== id);
    saveAddresses(updated);
  };

  return (
    <div className="space-y-8">
      {/* Saved Addresses */}
      <div className="grid gap-4">
        <h2 className="text-lg font-bold text-gray-800">Your Saved Addresses</h2>
        {addresses.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed text-gray-400">
                No addresses saved yet.
            </div>
        ) : (
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            {addresses.map((addr, index) => (
                <div
                key={addr._id || index}
                className={`flex items-center justify-between p-5 ${
                    index !== addresses.length - 1 ? "border-b border-slate-200" : ""
                }`}
                >
                <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-slate-800 uppercase flex items-center gap-2">
                        {addr.label}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => handleDelete(addr._id || index)}
                    className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                    <Trash2 size={18} />
                </button>
                </div>
            ))}
            </div>
        )}
      </div>

      {/* Title */}
      <div className="pt-6 border-t">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus size={20} /> Add New Address
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleAdd}>
            <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Address Label *</label>
                <select 
                    value={formData.label}
                    onChange={e => setFormData({...formData, label: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                    <option>Home</option>
                    <option>Office</option>
                    <option>Farm</option>
                    <option>Other</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">Zip Code / Pincode *</label>
                <input
                type="text"
                required
                value={formData.pincode}
                onChange={e => setFormData({...formData, pincode: e.target.value})}
                placeholder="Enter Pincode"
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>
            </div>

            <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Street Address *</label>
            <input
                type="text"
                required
                value={formData.street}
                onChange={e => setFormData({...formData, street: e.target.value})}
                placeholder="House No, Building Name, Street"
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            </div>

            {/* City & State */}
            <div className="grid md:grid-cols-2 gap-6">
            <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">City *</label>
                <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    placeholder="Enter City"
                    className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-600 mb-1 block">State *</label>
                <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({...formData, state: e.target.value})}
                    placeholder="Enter State"
                    className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
            </div>
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-700 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all flex items-center gap-2 disabled:bg-gray-400"
            >
            {isLoading ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : "Add Address"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddressManager;