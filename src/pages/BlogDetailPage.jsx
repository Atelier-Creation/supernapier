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
                keywords={(post.category || "agriculture") + ", agriculture blog, super napier, cattle feed, super napier cattle feed, buy seeds online, buy cattle feed online"}
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
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
