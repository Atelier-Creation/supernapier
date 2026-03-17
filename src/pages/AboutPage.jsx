import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Users, Award, Leaf, ShieldCheck, TrendingUp, ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SVG_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' }
    })
};

const stats = [
    { value: '10,000+', label: 'Happy Farmers', icon: Users },
    { value: '12+', label: 'Years Experience', icon: Award },
    { value: '200 Tons', label: 'Per Acre Yield', icon: TrendingUp },
    { value: '99%', label: 'Satisfaction Rate', icon: ShieldCheck },
];

const values = [
    {
        icon: ShieldCheck,
        title: 'Quality First',
        desc: 'Every seed we provide is rigorously tested for germination rate, purity, and vigour — ensuring you only ever plant the best.',
        bg: 'bg-[#f2fae6]',
        accent: 'text-[#16a34a]',
        iconBg: 'bg-[#dcfce7]'
    },
    {
        icon: Users,
        title: 'Farmer-Centric',
        desc: 'Our decisions start with the farmer. We listen, learn, and build solutions that make a real difference in the field and at the market.',
        bg: 'bg-[#fff4ed]',
        accent: 'text-orange-500',
        iconBg: 'bg-orange-100'
    },
    {
        icon: Leaf,
        title: 'Sustainable Growth',
        desc: 'We believe prosperous farming and a healthy planet go hand in hand. Our seeds are bred to reduce inputs and increase earth-friendly yields.',
        bg: 'bg-[#eef8ed]',
        accent: 'text-[#059669]',
        iconBg: 'bg-[#d1fae5]'
    },
];

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#FAFCF8] min-h-screen"
        >
            {/* ── HERO ── */}
            <section className="relative overflow-hidden rounded-b-[2rem] bg-gray-900 text-white pt-32 pb-28 px-4">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-slider4.jpg"
                        alt="About Background"
                        className="w-full h-full object-cover object-center opacity-100"
                    />
                </div>
                {/* SVG pattern */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
                    <div className="absolute inset-0" style={{ backgroundImage: SVG_PATTERN }} />
                </div>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 pointer-events-none z-0" />
                {/* palm decoration right and left */}
                <img
                    src="/palm-tree-shadow.avif"
                    alt=""
                    className="absolute invert top-0 -right-32 h-full object-contain opacity-50 pointer-events-none z-0"
                />
                <img
                    src="/palm-tree-shadow.avif"
                    alt=""
                    className="absolute invert top-0 -left-32 scale-x-[-1] h-full object-contain opacity-50 pointer-events-none z-0"
                />

                <div className="relative max-w-4xl mx-auto pt-15 text-center z-10">
                    <motion.p
                        custom={0} variants={fadeUp} initial="hidden" animate="visible"
                        className="text-xs font-bold text-[#4ade80] uppercase tracking-widest mb-4"
                    >
                        Our Story
                    </motion.p>
                    <motion.h1
                        custom={1} variants={fadeUp} initial="hidden" animate="visible"
                        className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6"
                    >
                        About{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">
                            Super Napier
                        </span>
                    </motion.h1>
                    <motion.p
                        custom={2} variants={fadeUp} initial="hidden" animate="visible"
                        className="text-gray-100 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Empowering Indian farmers with world-class seeds and agri-knowledge, one harvest at a time.
                    </motion.p>
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section className="py-24 px-4 relative overflow-hidden bg-[#FAFCF8]">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0" />
                </div>
                <img
                    src="/palm-tree-shadow.avif"
                    alt=""
                    className="absolute top-0 -right-48 h-full object-contain opacity-30 pointer-events-none"
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text */}
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <p className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-2">Who We Are</p>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight mb-6 break-all">
                                Rooted In <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">Purpose</span>
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-5">
                                Super Napier was founded with a single mission — to put the most productive, resilient seeds into the hands of every farmer in India. Over more than a decade we've grown from a small nursery to a trusted agri-brand serving tens of thousands of farmers across the country.
                            </p>
                            <p className="text-gray-500 leading-relaxed mb-8">
                                Our flagship crop, the <span className="font-bold text-gray-800">Super Napier Grass</span>, yields up to 200 tonnes per acre annually and thrives across diverse soil and climate conditions. Backed by continuous field research and farmer feedback, we improve with every season.
                            </p>
                            <Link to="/products">
                                <button className="bg-[#111] hover:bg-black text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2">
                                    Explore Products <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            custom={1}
                            className="relative"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/napierStems.webp"
                                    alt="Super Napier Grass"
                                    className="w-full h-[480px]  object-cover"
                                />
                            </div>
                            {/* floating badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4">
                                <div className="bg-[#dcfce7] rounded-xl p-3">
                                    <Sprout className="w-6 h-6 text-[#16a34a]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Germination Rate</p>
                                    <p className="text-2xl font-black text-gray-900">95%+</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section className="py-20 px-4 bg-[#f2fae6] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: SVG_PATTERN }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-2">By The Numbers</p>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                            Impact That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">Matters</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map(({ value, label, icon: Icon }, i) => (
                            <motion.div
                                key={label}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-3xl px-6 py-8 text-center border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="bg-[#dcfce7] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-[#16a34a]" />
                                </div>
                                <p className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{value}</p>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VALUES ── */}
            <section className="py-24 px-4 bg-[#FAFCF8] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0" />
                </div>
                <img
                    src="/palm-tree-shadow.avif"
                    alt=""
                    className="absolute top-0 -left-48 h-full object-contain opacity-25 pointer-events-none scale-x-[-1]"
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <p className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-2">What Drives Us</p>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">Values</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map(({ icon: Icon, title, desc, bg, accent, iconBg }, i) => (
                            <motion.div
                                key={title}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                className={`${bg} rounded-3xl p-8 border border-white/60 shadow-sm hover:shadow-xl transition-all`}
                            >
                                <div className={`${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                                    <Icon className={`w-7 h-7 ${accent}`} />
                                </div>
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-14 bg-[#FAFCF8] relative overflow-hidden">
                <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 right-0 h-full object-contain opacity-10 md:opacity-[0.04] pointer-events-none z-0" />

                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-[#0f9c40] rounded-bl-[4rem] rounded-tr-[4rem] rounded-tl-2xl rounded-br-2xl py-20 px-8 relative overflow-hidden shadow-2xl">

                        {/* Decorative Leaves */}
                        <img
                            src="/Green-Leaf-PNG.png"
                            alt="Decorative Leaf"
                            className="absolute -top-8 -right-8 scale-y-[-1] scale-x-[-1] w-48 h-48 md:w-64 md:h-64 object-contain opacity-30 z-0 pointer-events-none drop-shadow-2xl"
                        />

                        <motion.div
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="relative z-10 max-w-3xl mx-auto text-center text-white"
                        >
                            <p className="text-xs font-bold text-[#dcfce7] uppercase tracking-widest mb-4">Ready to grow?</p>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6 text-white">
                                Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#bbf7d0]">Growing Family</span>
                            </h2>
                            <p className="text-green-50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                                Thousands of farmers trust Super Napier to power their farms. Start your journey with seeds built for success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/products">
                                    <button className="bg-white text-[#16a34a] hover:bg-green-50 px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:scale-105 flex items-center gap-2">
                                        Get Started Today <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                                <a href="tel:+91XXXXXXXXXX">
                                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
                                        <PhoneCall className="w-4 h-4" /> Contact Sales
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
