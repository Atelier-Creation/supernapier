import React from 'react';
import { Instagram, Sprout, Twitter } from 'lucide-react';

// Custom WhatsApp Icon since lucide doesn't have a perfect match
const WhatsAppIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="bg-white text-gray-900 pt-24 pb-8 border-t border-gray-100 flex flex-col justify-between align-center relative w-full overflow-hidden">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 mb-24 relative z-10">
                    {/* Left Column */}
                    <div className="flex flex-col space-y-8">
                        <h2 className="text-4xl md:text-4xl font-black uppercase tracking-tight leading-[1.5]">
                            Fueling Growth,<br />
                            Rooted in<br />
                            Quality.
                        </h2>
                        <div className="flex space-x-6 items-center">
                            <a href="#" className="text-gray-900 hover:text-[#16a34a] transition-colors"><Twitter className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" /></a>
                            <a href="#" className="text-gray-900 hover:text-[#16a34a] transition-colors"><Instagram className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" /></a>
                            <a href="#" className="text-gray-900 hover:text-[#16a34a] transition-colors"><WhatsAppIcon className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" /></a>
                        </div>
                    </div>

                    {/* Middle Column (Pills) */}
                    <div className="flex flex-col col-span-2 justify-center items-center">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <a href="/products" className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center">Product</a>
                            <a href="/" className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center">About Us</a>
                            <a href="/contact" className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center">Contact Us</a>
                            <a href="/blog" className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center">Blogs</a>
                            <a href="/partnership" className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center">Partnership</a>
                            <a href="#testimonials" className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center">Testimonials</a>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col md:pl-12">
                        <h4 className="text-xl font-bold mb-6 text-gray-900">Contact</h4>
                        <div className="text-sm text-gray-800 space-y-4 font-medium leading-relaxed">
                            <div>
                                <p className="font-bold text-gray-900">Super Napier HQ</p>
                                <p>25 Harvest Lane, Greenfield District</p>
                                <p>Springhaven, CA 92845</p>
                                <p>United States</p>
                            </div>
                            <div className="pt-2">
                                <a href="mailto:supernapierglobal@gmail.com" className="block hover:text-[#16a34a] transition-colors">supernapierglobal@gmail.com</a>
                                <a href="tel:+16675642637" className="block hover:text-[#16a34a] transition-colors">+1 (667) 564-2637</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Big Bottom Logo Area */}
                <div className="relative w-full flex flex-col items-center justify-center mt-20 mb-8 z-10">
                    <img
                        src="/logo1.png"
                        alt="Super Napier Background Logo"
                        className="w-full max-w-full h-auto object-contain opacity-90 drop-shadow-sm mb-4"
                        onError={(e) => {
                            // Fallback if logo is missing 
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="hidden text-[clamp(4rem,10vw,12rem)] font-black text-gray-900 tracking-tighter leading-none justify-center items-center w-full">
                        Super<span className="text-[#16a34a]">Napier</span>
                        <Sprout className="h-40 w-40 text-[#16a34a] ml-1" />
                    </div>
                </div>

                {/* Bottom Bar Texts */}
                <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs md:text-sm font-semibold relative z-20 w-full px-4 mt-6">
                    <p>&copy; {new Date().getFullYear()} Super Napier</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900 transition-colors">Terms and Conditions</a>
                    </div>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
