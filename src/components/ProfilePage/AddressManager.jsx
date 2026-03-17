import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const AddressManager = () => {
  const [savedAddresses] = useState([
    {
      id: 1,
      name: "Bessie Cooper",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
    },
    {
      id: 2,
      name: "Bessie Cooper",
      address: "6391 Elgin St. Celina, Delaware 10299",
    },
  ]);

  return (
    <div>
      {/* Saved Addresses */}
      <div className="mb-8 border border-slate-200 rounded-2xl overflow-hidden">
        {savedAddresses.map((addr, index) => (
          <div
            key={addr.id}
            className={`flex items-center justify-between p-4 ${
              index !== savedAddresses.length - 1
                ? "border-b border-slate-200"
                : ""
            }`}
          >
            <div>
              <h3 className="font-semibold text-sm text-slate-700">
                {addr.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{addr.address}</p>
            </div>

            <div className="flex gap-4 text-sm font-medium">
              <button className="text-emerald-700">Edit</button>
              <button className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-6">Add New Address</h2>

      {/* Form */}
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold">First Name *</label>
            <input
              type="text"
              placeholder="Ex. John"
              className="w-full p-3 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Last Name *</label>
            <input
              type="text"
              placeholder="Ex. Doe"
              className="w-full p-3 border border-slate-200 rounded-2xl"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Company Name (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter Company Name"
            className="w-full p-3 border border-slate-200 rounded-2xl"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-semibold">Country *</label>
          <div className="relative">
            <select className="w-full p-3 border border-slate-200 rounded-2xl appearance-none">
              <option>Select Country</option>
            </select>

            <ChevronDown
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Street Address *</label>
          <input
            type="text"
            placeholder="Enter Street Address"
            className="w-full p-3 border border-slate-200 rounded-2xl"
          />
        </div>

        {/* City & State */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold">City *</label>
            <div className="relative">
              <select className="w-full p-3 border border-slate-200 rounded-2xl appearance-none">
                <option>Select City</option>
              </select>

              <ChevronDown
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">State *</label>
            <div className="relative">
              <select className="w-full p-3 border border-slate-200 rounded-2xl appearance-none">
                <option>Select State</option>
              </select>

              <ChevronDown
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Zip Code *</label>
          <input
            type="text"
            placeholder="Enter Zip Code"
            className="w-full p-3 border border-slate-200 rounded-2xl"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Phone *</label>
          <input
            type="tel"
            placeholder="Enter Phone Number"
            className="w-full p-3 border border-slate-200 rounded-2xl"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Email *</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full p-3 border border-slate-200 rounded-2xl"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-700 text-white px-8 py-3 rounded-full"
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddressManager;