import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockPosts } from '../data/mockData';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pb-12 bg-[#F1F8E9] min-h-screen pt-30"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-[#1B5E20] mb-6 tracking-tight"
                    >
                        The Growers' <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] to-[#1B5E20]">Journal</span>
                    </motion.h1>
                    <p className="text-xl text-[#5D4037] max-w-2xl mx-auto font-medium">
                        Expert insights, farming tips, and the latest agricultural news directly from the Super Napier agronomy team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {mockPosts.map((post) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={post.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-[#1B5E20]/5 transition-all group flex flex-col h-full cursor-pointer"
                        >
                            <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center space-x-2 text-[#1B5E20] font-bold text-sm shadow-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h2 className="text-2xl font-bold text-[#1B5E20] mb-4 group-hover:text-[#5D4037] transition-colors leading-tight">{post.title}</h2>
                                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{post.excerpt}</p>

                                    <div className="flex items-center space-x-2 text-[#1B5E20] font-bold group-hover:text-[#a3e635] mt-auto transition-colors w-max">
                                        <span className="uppercase tracking-wider text-sm">Read Article</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Signup in Blog */}
                <div className="mt-24 bg-[#0f9c40] rounded-bl-[4rem] rounded-tr-[4rem] rounded-tl-2xl rounded-br-2xl p-12 text-center text-white relative overflow-hidden shadow-2xl">

                    {/* Decorative Leaves */}
                    <img
                        src="/Green-Leaf-PNG.png"
                        alt="Decorative Leaf"
                        className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 object-contain opacity-30 z-0 pointer-events-none drop-shadow-2xl"
                    />

                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4 break-all">Never Miss an Update</h3>
                        <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg font-medium">
                            Get seasonal planting guides, exclusive seed discounts, and agricultural news delivered straight to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                className="flex-1 px-6 py-4 bg-white/30 rounded-bl-[1rem] rounded-tr-[1rem] rounded-sm text-[#0f9c40] border-none outline-none focus:ring-4 focus:ring-[#fde047]/50 shadow-inner text-lg placeholder-[#0f9c40]"
                            />
                            <button type="button" className="bg-[#fde047] hover:bg-[#facc15] text-black px-8 py-4 rounded-bl-[1rem] rounded-tr-[1rem] rounded-sm font-bold text-lg transition-colors shadow-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
