import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockPosts } from '../data/mockData';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Find the post by ID
        const foundPost = mockPosts.find(p => p.id === parseInt(id));
        if (foundPost) {
            setPost(foundPost);
        } else {
            // Redirect to blog if post not found
            navigate('/blog');
        }

        // Scroll to top when opening a new detail page
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (!post) return null;

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
                image={post.image}
                url={window.location.href}
                keywords={post.category + ", agriculture blog, super napier"}
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
                        <span>{post.date}</span>
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
                        src={post.image}
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

                        <div className="prose prose-lg prose-green max-w-none text-gray-700 leading-loose">
                            <p>{post.content}</p>

                            {/* Generic placeholder content to make the post feel long and realistic */}
                            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Importance of Adaptation</h3>
                            <p>
                                Adaptability is the single most important trait a modern farmer can possess. The landscape of agriculture is constantly shifting, influenced by wildly fluctuating weather patterns, new economic regulations, and evolving consumer demands. Those who cling strictly to the methodologies of the past century will inevitably find themselves struggling to maintain profitability and soil health.
                            </p>

                            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Key Takeaways for This Season</h3>
                            <ul className="list-disc pl-5 mt-4 space-y-2 mb-8">
                                <li>Always conduct thorough pH testing before investing in heavy fertilizers.</li>
                                <li>Embrace technological integrations, like smart irrigation sensors, to dramatically cut down overhead costs.</li>
                                <li>Don't underestimate the power of cover crops in preventing soil erosion during off-seasons.</li>
                            </ul>

                            <p>
                                Ultimately, building a resilient farm requires patience and a willingness to experiment. By continuously monitoring environmental factors and staying up-to-date with agronomy advancements, you can secure entirely new streams of revenue and help contribute to a much more sustainable global food supply chain.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
