import React from "react";
import { motion } from "framer-motion";

export default function TermsAndCondition() {

    const bannerImage = "https://img.freepik.com/premium-photo/farmer-green-plaid-shirt-examining-crop-yield-data-field-lush-green-vegetables_923559-15904.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80"; // change to your image path

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#FAFCF8] pt-24 pb-16"
        >
            <div className="max-w-[95%] mx-auto">

                {/* Banner Image */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="relative w-full h-[40vh] md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl mb-12"
                >
                    <img
                        src={bannerImage}
                        alt="Super Napier Grass"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h1 className="text-white text-2xl md:text-5xl lg:text-7xl font-bold text-center px-4">
                            Terms & 
                            <br/>Conditions
                        </h1>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100"
                >

                    <div className="prose prose-lg max-w-none text-gray-700 leading-loose">

                        <h3 className="text-2xl font-bold text-gray-900">1. Product Information</h3>
                        <p>
                            Super Napier grass planting material is supplied for agricultural and fodder cultivation purposes.
                            While we ensure high-quality planting material, growth performance may vary depending on soil
                            condition, irrigation, climate, and farming practices.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">2. Farming Responsibility</h3>
                        <p>
                            The buyer is responsible for proper land preparation, irrigation, fertilization, and pest
                            management practices. The seller cannot guarantee yield or growth performance due to
                            environmental factors beyond control.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">3. Order & Delivery</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Orders will be processed after payment confirmation.</li>
                            <li>Delivery timelines may vary depending on location and logistics availability.</li>
                            <li>Customers must verify the planting material at the time of delivery.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">4. No Return Policy</h3>
                        <p>
                            Since Super Napier planting material is a perishable agricultural product, returns or
                            replacements are not accepted once the product has been delivered unless there is clear
                            damage during transport.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">5. Payment Terms</h3>
                        <p>
                            All payments must be completed through the available payment methods before order
                            processing. Pricing may change depending on seasonal availability and market conditions.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">6. Liability Disclaimer</h3>
                        <p>
                            The seller shall not be responsible for any loss, reduced yield, or farming issues arising
                            from improper cultivation practices, natural disasters, pest attacks, or unsuitable
                            environmental conditions.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">7. Agreement</h3>
                        <p>
                            By purchasing Super Napier planting material, the buyer agrees to the above terms and
                            conditions and acknowledges that agricultural outcomes depend on multiple external factors.
                        </p>

                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}