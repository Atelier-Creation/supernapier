import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { mockPosts } from '../data/mockData';
import { Calendar, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function BlogSection() {
    const latestPosts = mockPosts.slice(0, 3); // Show only the latest 3 posts

    return (
        <section className="py-4 md:py-24 bg-[#FAFCF8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                            Latest Agricultural Insights
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                            Discover expert tips, seasonal planting guides, and the latest agricultural news directly from the Super Napier agronomy team.
                        </p>
                    </div>

                    <Link to="/blog">
                        <button className="group inline-flex items-center gap-2 bg-transparent hover:bg-gray-900 text-gray-900 hover:text-white border-2 border-gray-900 font-bold px-8 py-3.5 rounded-full transition-colors duration-200">
                            View All Articles
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
                    {latestPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                            className="bg-[#ecf3e1] rounded-tl-2xl rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer"
                        >
                            <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center space-x-2 text-gray-900 font-bold text-sm shadow-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors leading-tight line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center space-x-2 text-gray-900 font-bold mt-auto transition-colors w-max">
                                        <span className="uppercase tracking-wider text-sm">Read Article</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View */}
                <div className="block md:hidden">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        className="pb-8"
                        style={{ paddingBottom: '2rem' }}
                    >
                        {latestPosts.map((post, index) => (
                            <SwiperSlide key={`mobile-${post.id}`} className="h-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="bg-[#ecf3e1] rounded-tl-2xl rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-2xl overflow-hidden shadow-sm transition-all flex flex-col h-full cursor-pointer mt-4"
                                >
                                    <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center space-x-2 text-gray-900 font-bold text-sm shadow-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>{post.date}</span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-grow">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors leading-tight line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-8 flex-grow leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center space-x-2 text-gray-900 font-bold mt-auto transition-colors w-max">
                                                <span className="uppercase tracking-wider text-sm">Read Article</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
