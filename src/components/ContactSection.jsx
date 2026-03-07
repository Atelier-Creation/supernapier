import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, PhoneCall, ArrowRight } from 'lucide-react';

export default function ContactSection() {
    return (
        <section id="contact" className="py-6 md:py-24 bg-[#FAFCF8] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Left Column - 3 Contact Cards */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        <div className="mb-4">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                                Get in touch <br /> with us.
                            </h2>
                            <p className="mt-4 text-gray-500 font-medium">
                                We are here to help you with any questions or support you may need.
                            </p>
                        </div>

                        {/* Card 1: Mail us */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-[#F4F1EC] rounded-2xl flex items-center justify-center shrink-0">
                                <Mail className="w-7 h-7 text-[#0f9c40]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Mail us 24/7</h3>
                                <div className="h-[1px] w-full bg-gray-200 mb-4"></div>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-gray-500 space-y-1 font-medium">
                                        <p>supernapierglobal@gmail.com</p>
                                        <p>support@supernapier.com</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0f9c40] transition-colors" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Our Location */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-[#F4F1EC] rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="w-7 h-7 text-[#0f9c40]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Our location</h3>
                                <div className="h-[1px] w-full bg-gray-200 mb-4"></div>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-gray-500 space-y-1 font-medium">
                                        <p>25 Gandhi nagar Lane, Greenfield District</p>
                                        <p>SpringField, IN 692845</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0f9c40] transition-colors" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3: Call us */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-[#F4F1EC] rounded-2xl flex items-center justify-center shrink-0">
                                <PhoneCall className="w-7 h-7 text-[#0f9c40]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Call us 24/7</h3>
                                <div className="h-[1px] w-full bg-gray-200 mb-4"></div>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-gray-500 space-y-1 font-medium">
                                        <p>Phone: +91 63675 642637</p>
                                        <p>Mobile: +91 98765 43210</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0f9c40] transition-colors" />
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-7 mt-8 lg:mt-0">
                        <div className="bg-[#0f9c40] rounded-[2rem] p-8 md:p-12 h-full shadow-2xl relative overflow-hidden">
                            {/* Decorative blur in the background of the dark form */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0f9c40] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                            <img
                                src="/Green-Leaf-PNG.png"
                                alt="Decorative Leaf"
                                className="absolute -bottom-8 -right-8 scale-x-[-1] w-48 h-48 md:w-64 md:h-64 object-contain opacity-30 z-0 pointer-events-none drop-shadow-2xl"
                            />

                            <h2 className="text-xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight relative z-10">
                                Always ready to <br /> answer your questions
                            </h2>

                            <form className="relative z-10 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="First Name*"
                                        className="w-full bg-[#2a3c23] border border-white/5 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#fde047]/50 placeholder-white/60 transition-all"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email*"
                                        className="w-full bg-[#2a3c23] border border-white/5 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#fde047]/50 placeholder-white/60 transition-all"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="tel"
                                        placeholder="Your Phone*"
                                        className="w-full bg-[#2a3c23] border border-white/5 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#fde047]/50 placeholder-white/60 transition-all"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Subject*"
                                        className="w-full bg-[#2a3c23] border border-white/5 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#fde047]/50 placeholder-white/60 transition-all"
                                        required
                                    />
                                </div>

                                <textarea
                                    placeholder="Comment"
                                    rows="6"
                                    className="w-full bg-[#2a3c23] border border-white/5 text-white rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#fde047]/50 placeholder-white/60 transition-all resize-none"
                                ></textarea>

                                <div className="flex items-start gap-3 mt-4">
                                    <input
                                        type="checkbox"
                                        id="save-info"
                                        className="mt-1 w-5 h-5 rounded bg-[#2a3c23] border-white/20 text-[#0f9c40] focus:ring-[#fde047]/50"
                                    />
                                    <label htmlFor="save-info" className="text-white/80 text-sm leading-relaxed">
                                        Save my name, email, and website in this browser for the next time I comment.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-8 bg-[#fde047] hover:bg-[#facc15] text-black font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-xl"
                                >
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                    Send message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
