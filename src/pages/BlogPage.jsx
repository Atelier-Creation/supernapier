import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import SEO from '../components/SEO';
import { blogApi } from '../api/blogApi';
import toast from 'react-hot-toast';

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogApi.getAll();
                if (response.data.success) {
                    setPosts(response.data.data);
                } else {
                    toast.error("Failed to load blogs");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("An error occurred while loading blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pb-12 bg-[#F1F8E9] min-h-screen pt-30"
        >
            <SEO 
                title="Agriculture Blog & Insights"
                description="Read our latest articles on agriculture, cattle feeding, soil preparation, and how Super Napier grass can revolutionize your farming yields."
                url={window.location.href}
            />
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

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="w-12 h-12 text-[#1B5E20] animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 text-xl font-medium">
                        No articles available at the moment. Please check back later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => {
                            const blogId = post._id || post.id;
                            // Helper to format date if it comes as ISO string
                            const formatDate = (dateString) => {
                                if (!dateString) return "Recent";
                                const date = new Date(dateString);
                                return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                            };
                            return (
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    key={blogId}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-[#1B5E20]/5 transition-all group flex flex-col h-full cursor-pointer"
                                >
                                    <Link to={`/blog/${blogId}`} className="flex flex-col h-full">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={post.image && post.image.length > 0 ? post.image[0] : (post.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800')}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800' }}
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center space-x-2 text-[#1B5E20] font-bold text-sm shadow-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(post.date || post.createdAt)}</span>
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
                            );
                        })}
                    </div>
                )}

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
