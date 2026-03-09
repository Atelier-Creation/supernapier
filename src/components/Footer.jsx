import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Navigation, Phone } from 'lucide-react';

export default function Footer() {
    const [logoError, setLogoError] = useState(false);

    return (
        <footer className="relative w-full text-white bg-[#6da62f] md:bg-[#fafcf8] overflow-hidden pt-[50px] md:pt-[450px]">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <img src="/footer-bg-image-green.png" alt="Footer Background" className="w-full h-full object-cover object-top md:object-bottom" />
                {/* Gradient overlay to ensure text legibility at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#0e1411] via-[#0e1411]/90 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 pb-4">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-8 md:mb-12">

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full lg:w-auto mb-10 lg:mb-0">
                        {/* Col 1 */}
                        <div className="flex flex-col">
                            <h4 className="text-lg md:text-xl font-bold mb-2 text-white">Contact</h4>
                            <div className="h-[2px] w-full bg-white mb-4"></div>
                            <ul className="space-y-2 text-sm text-gray-300 font-semibold">
                                <li><a href="/contact" className="hover:text-white transition-colors">Contact us</a></li>
                                <li><a href="/support" className="hover:text-white transition-colors">Support Forum</a></li>
                                <li><a href="/contact" className="hover:text-white transition-colors">Bulk Order</a></li>
                            </ul>
                        </div>

                        {/* Col 2 */}
                        <div className="flex flex-col">
                            <h4 className="text-lg md:text-xl font-bold mb-2 text-white">Resources</h4>
                            <div className="h-[2px] w-full bg-white mb-4"></div>
                            <ul className="space-y-2 text-sm text-gray-300 font-semibold">
                                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="/blog" className="hover:text-white transition-colors">Our Blog</a></li>
                                <li><a href="/affiliates" className="hover:text-white transition-colors">How to Became Farmer?</a></li>
                            </ul>
                        </div>

                        {/* Col 3 */}
                        <div className="flex flex-col col-span-2 md:col-span-1">
                            <h4 className="text-lg md:text-xl font-bold mb-2 text-white">Legal</h4>
                            <div className="h-[2px] w-full max-w-[50%] md:max-w-full bg-white mb-4"></div>
                            <ul className="space-y-2 text-sm text-gray-300 font-semibold">
                                <li><a href="/eula" className="hover:text-white transition-colors">Refund & Return Policy</a></li>
                                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Socials & Contact */}
                    <div className="flex flex-col md:flex-row items-start md:items-end lg:items-end justify-between lg:justify-end gap-8 md:gap-16 w-full lg:w-auto">
                        {/* Socials */}
                        <div className="flex space-x-4 mb-2 lg:mb-0 pb-2">
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Mail className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="text-left md:text-right text-sm text-gray-200 space-y-1.5 font-semibold">

                            {logoError ? (
                                <h4 className="text-xl md:text-2xl font-bold mb-4 text-white text-left md:text-right">Super<span className="text-orange-500">Napier</span>.com</h4>
                            ) : (
                                <h4 className="text-xl md:text-2xl font-bold mb-4 text-white text-left md:text-right">Super<span className="text-orange-500">Napier</span>.com</h4>
                                // <img
                                //     src="/logo.png"
                                //     alt="Super Napier Logo"
                                //     className="h-12 md:h-16 w-auto object-contain mb-4 ml-0 md:ml-auto"
                                //     // onError={() => setLogoError(true)}
                                // />
                            )}
                            <p className="flex items-center justify-start md:justify-end gap-2 text-[13px]">Virudhachalam, Cuddalore <Navigation className="w-3.5 h-3.5 -mt-0.5" /></p>
                            <p className="flex items-center justify-start md:justify-end gap-2 text-[13px]">Vannankudikadu, Tamil Nadu 606110 <Navigation className="w-3.5 h-3.5 -mt-0.5" /></p>
                            <p className="flex items-center justify-start md:justify-end gap-2 text-[13px]">tel.: (+91) 94889 32336 <Phone className="w-3.5 h-3.5 -mt-0.5" /></p>
                            <p className="flex items-center justify-start md:justify-end gap-2 text-[13px]">email: contact@supernapier.com <Mail className="w-3.5 h-3.5 -mt-0.5" /></p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative z-10 border-t border-gray-600/50 pt-6 flex flex-col lg:flex-row items-center justify-between text-xs text-gray-300 gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 font-bold w-full lg:w-auto">
                        {logoError ? (
                            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter">Super<span className="text-orange-500">Napier</span> </h2>
                        ) : (
                            <img
                                src="/logo.png"
                                alt="Super Napier Logo"
                                className="h-6 md:h-8 w-auto object-contain"
                                onError={() => setLogoError(true)}
                            />
                        )}
                        <div className="flex flex-wrap justify-center gap-4 text-[11px] md:text-[13px]">
                            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
                            <a href="/refund" className="hover:text-white transition-colors">Refund & Return Policy</a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto mt-2 lg:mt-0">
                        {/* Payment Icons (mock styled text cards) */}
                        <div className="flex gap-2 mb-2 md:mb-0">
                            <div className="bg-gradient-to-br from-red-500 to-orange-400 px-2.5 py-1 rounded text-[10px] font-black italic text-white shadow">MasterCard</div>
                            <div className="bg-blue-700 px-2.5 py-1 rounded text-[10px] font-black italic text-white shadow">VISA</div>
                            <div className="bg-[#003087] px-2.5 py-1 rounded text-[10px] font-bold text-white shadow">PayPal</div>
                            <div className="bg-blue-400 px-2.5 py-1 rounded text-[10px] font-bold text-white shadow">AMEX</div>
                        </div>

                        <p className="text-center md:text-right font-medium text-[11px]">Coded and designed by <a href="https://theateliercreation.com/" target="_blank" className='font-medium text-white hover:text-orange-500 transition-colors'>The Atelier Creation</a>. All rights reserved to SuperNapier.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
