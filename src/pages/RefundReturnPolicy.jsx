import React from "react";
import { motion } from "framer-motion";

export default function RefundReturnPolicy() {

    const bannerImage = "https://img.freepik.com/premium-photo/young-asian-woman-senior-man-farmer-working-together-organic-hydroponic-salad-vegetable-farm-modern-vegetable-garden-owner-using-digital-tablet-inspect-quality-lettuce-greenhouse-garden_265022-33134.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80";

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
                            Refund & <br /> Return Policy
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

                        <h3 className="text-2xl font-bold text-gray-900">1. Nature of Agricultural Products</h3>
                        <p>
                            Super Napier planting materials are agricultural and perishable products.
                            Due to their biological nature, returns or exchanges are generally not
                            possible once the product has been delivered.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">2. Return Eligibility</h3>
                        <p>
                            Returns will only be considered under the following conditions:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>The product was damaged during transportation.</li>
                            <li>The wrong product was delivered.</li>
                            <li>The quantity delivered is significantly different from the order.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">3. Reporting an Issue</h3>
                        <p>
                            If you receive damaged or incorrect planting material, you must notify us
                            within <strong>24 hours of delivery</strong>. Customers may be required to
                            provide photos or videos of the product as proof for verification.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">4. Refund Process</h3>
                        <p>
                            Once the issue has been verified and approved, the refund will be processed
                            through the original payment method used during the purchase. Refunds may
                            take several business days depending on the payment provider or bank.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">5. Non-Refundable Situations</h3>
                        <p>
                            Refunds or returns will not be accepted in the following situations:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Improper handling or storage after delivery.</li>
                            <li>Planting failure due to soil, irrigation, or climate conditions.</li>
                            <li>Delayed reporting of issues beyond the allowed reporting period.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">6. Cancellation Policy</h3>
                        <p>
                            Orders can only be cancelled before the dispatch process begins.
                            Once the order has been packed or shipped, cancellation may not
                            be possible due to the perishable nature of the product.
                        </p>

                        <h3 className="break-all text-2xl font-bold text-gray-900 mt-10">7. Contact for Refund Requests</h3>
                        <p>
                            If you have any questions regarding refunds or returns, please
                            contact our support team through the contact details provided
                            on our website. Our team will review the request and assist you
                            accordingly.
                        </p>

                    </div>

                </motion.div>
            </div>
        </motion.div>
    );
}