import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin, Loader } from 'lucide-react';
import SEO from '../components/SEO';
import { blogApi } from '../api/blogApi';
import toast from 'react-hot-toast';

export default function BlogDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await blogApi.getById(id);
                if (response.data.success) {
                    setPost(response.data.data);
                } else {
                    toast.error("Blog post not found");
                    navigate('/blog');
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
                toast.error("Failed to load blog details");
                navigate('/blog');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetails();

        // Scroll to top when opening a new detail page
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFCF8] pt-32 pb-16 flex justify-center items-center">
                <Loader className="w-12 h-12 text-[#1B5E20] animate-spin" />
            </div>
        );
    }

    if (!post) return null;

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return "Recent";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const imageUrl = post.image && post.image.length > 0 ? post.image[0] : (post.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#FAFCF8] pt-24 pb-16"
        >
            <SEO 
                title={post.title} 
                description={post.excerpt} 
                image={imageUrl}
                url={window.location.href}
                keywords={post.metaKeywords || ((post.category || "agriculture") + ", agriculture blog, super napier, cattle feed, super napier cattle feed, buy seeds online, buy cattle feed online")}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back button */}
                <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-[#0f9c40] transition-colors mb-8 font-semibold">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to all articles
                </Link>

                {/* Article Header */}
                <div className="mb-10 text-center">
                    <div className="flex items-center justify-center space-x-2 text-[#0f9c40] font-bold text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date || post.createdAt)}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span>5 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                        {post.title}
                    </h1>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl mb-12"
                >
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Article Content Area */}
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Social Share Sidebar (Desktop) */}
                    <div className="hidden md:flex flex-col items-center space-y-4 pt-4 sticky top-32 h-fit">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</span>
                        <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors">
                            <Facebook className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-400 hover:border-blue-200 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-700 hover:border-blue-200 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#0f9c40] hover:border-[#0f9c40]/30 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Main Text Content */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex-1 max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100"
                    >
                        <p className="text-xl md:text-2xl text-gray-500 font-medium italic mb-10 leading-relaxed border-l-4 border-[#fde047] pl-6">
                            "{post.excerpt}"
                        </p>

                        <div 
                            className="prose prose-lg prose-green max-w-none text-gray-700 leading-loose"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* WhatsApp CTA Button */}
                        {post.whatsappCTA && (
                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <a
                                    href={`https://wa.me/916381250549?text=${encodeURIComponent(post.whatsappCTAMessage || `Hi, I have a query about the article "${post.title}"`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-[1.02] shadow-md shadow-[#25d366]/20 text-sm"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.451 5.417 1.452 5.51.003 9.994-4.479 9.997-9.995.002-2.673-1.031-5.185-2.907-7.062-1.877-1.877-4.378-2.91-7.052-2.912-5.518 0-10.002 4.48-10.006 9.997-.001 1.922.502 3.8 1.454 5.408L1.758 21.94l6.195-1.626h-.306zM17.473 14.3c-.302-.15-1.787-.88-2.062-.98-.276-.1-.476-.15-.676.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.268-.467-2.414-1.485-.892-.795-1.493-1.777-1.668-2.077-.175-.3-.018-.463.13-.61.135-.13.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C9.845 9.1 9.245 7.6 8.995 7c-.244-.583-.49-.504-.676-.513-.175-.008-.375-.01-.576-.01-.2 0-.525.075-.8 1.075-.276 1-1.002 3.25-1.002 3.375 0 .125.125.25.25.375.125.125 1.5 2.292 3.633 3.213.507.219.904.35 1.214.448.51.162.974.139 1.341.084.409-.06 1.787-.73 2.037-1.43c.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
                                    </svg>
                                    <span>{post.whatsappCTAText || "Inquire on WhatsApp"}</span>
                                </a>
                            </div>
                        )}

                        {/* Tagged / Featured Products */}
                        {post.taggedProducts && post.taggedProducts.length > 0 && (
                            <div className="mt-10 border-t border-gray-100 pt-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-5">Featured Products</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {post.taggedProducts.map((prod) => {
                                        const prodName = typeof prod.name === 'object' ? prod.name.en : prod.name;
                                        const prodImg = prod.image || (prod.images && prod.images[0]) || '/placeholder.png';
                                        const price = prod.price || (prod.weightOptions && prod.weightOptions[0] ? prod.weightOptions[0].price : 0);
                                        return (
                                            <div key={prod._id} className="flex gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition-all">
                                                <img
                                                    src={prodImg}
                                                    alt={prodName}
                                                    className="w-16 h-16 rounded-xl object-cover border bg-white flex-shrink-0"
                                                />
                                                <div className="flex flex-col justify-between flex-grow min-w-0">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{prodName}</h4>
                                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                                            {typeof prod.description === 'object' ? prod.description?.en : prod.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-[#1B5E20] font-black text-sm">₹{price}</span>
                                                        <Link
                                                            to={`/product/${prod._id}`}
                                                            className="text-xs font-bold text-green-700 hover:text-green-800 hover:underline"
                                                        >
                                                            View Product →
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
