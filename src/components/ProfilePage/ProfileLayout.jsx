import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Package, Wallet, Headphones, Menu, X } from "lucide-react";

export default function ProfileLayout() {
    const [openMenu, setOpenMenu] = useState(false);

    const SVG_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

    const navItems = [
        { name: "Personal Information", path: "/profile" },
        { name: "My Orders", path: "/profile/orders" },
        { name: "Manage Address", path: "/profile/address" },
        { name: "Payment Method", path: "/profile/payment" },
        { name: "Password Manager", path: "/profile/password" },
        { name: "Logout", path: "/profile/logout" },
    ];

    return (
        <div className="relative pt-30 pb-10">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: SVG_PATTERN }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-sm font-sans text-slate-700">

                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <h2 className="text-lg font-semibold">Profile Menu</h2>

                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                        className="p-2 rounded-lg border"
                    >
                        {openMenu ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {openMenu && (
                    <div className="md:hidden mb-6 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end
                                onClick={() => setOpenMenu(false)}
                                className={({ isActive }) =>
                                    `block w-full px-5 py-3 rounded-xl font-medium transition-all ${isActive
                                        ? "bg-amber-400 text-slate-900"
                                        : "bg-white border border-slate-100 hover:bg-slate-50"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-12">

                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-full md:w-1/4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end
                                className={({ isActive }) =>
                                    `block w-full text-left px-6 py-4 rounded-xl transition-all font-medium ${isActive
                                        ? "bg-amber-400 text-slate-900 shadow-sm"
                                        : "bg-white border border-slate-100 hover:bg-slate-50"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </aside>

                    {/* Page Content */}
                    <main className="flex-1">
                        <Outlet />
                    </main>

                </div>

                {/* Footer */}
                <footer className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">

                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-50 p-3 rounded-xl">
                            <Package className="text-emerald-700" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Free Shipping</h4>
                            <p className="text-sm text-slate-500">
                                Free shipping for order above $50
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-50 p-3 rounded-xl">
                            <Wallet className="text-emerald-700" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Flexible Payment</h4>
                            <p className="text-sm text-slate-500">
                                Multiple secure payment options
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-50 p-3 rounded-xl">
                            <Headphones className="text-emerald-700" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">24x7 Support</h4>
                            <p className="text-sm text-slate-500">
                                We support online all days.
                            </p>
                        </div>
                    </div>

                </footer>

            </div>
        </div>
    );
}