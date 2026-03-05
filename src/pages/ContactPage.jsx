import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection';

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pt-24 min-h-screen bg-[#FAFCF8]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center pt-10">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1B5E20] mb-6 tracking-tight uppercase">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3e635] to-[#1B5E20]">Us</span>
                    </h1>
                    <p className="text-xl text-[#5D4037] max-w-2xl mx-auto font-medium">
                        Reach out for support, inquiries, or business partnerships.
                    </p>
                </div>
            </div>

            <ContactSection />
        </motion.div>
    );
}
