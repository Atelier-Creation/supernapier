import React from "react";
import { motion } from "framer-motion";

export default function ShippingPolicy() {
    const bannerImage = "https://img.freepik.com/premium-photo/worker-loading-harvested-crop-truck-farm-concept-logistics-agriculture-transportation_923559-15820.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80";

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
                        alt="Shipping & Delivery"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <h1 className="text-white text-2xl md:text-5xl lg:text-7xl font-bold text-center px-4">
                            Shipping & <br /> Delivery Policy
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
                        <h3 className="text-2xl font-bold text-gray-900">1. Order Processing Time</h3>
                        <p>
                            We specialize in supplying high-quality, fresh Super Napier grass planting material. Since these are live vegetative cuttings, we harvest and prepare them post-order confirmation to ensure maximum viability.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>All orders are processed and prepared for shipping within <strong>2 to 4 business days</strong>.</li>
                            <li>Orders are not shipped or delivered on public holidays or Sundays.</li>
                            <li>If we experience a high volume of orders, shipments may be delayed by a few days. If there is a significant delay in the shipment of your order, we will contact you via email or phone.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">2. Shipping Rates & Delivery Estimates</h3>
                        <p>
                            Shipping charges for your orders will be calculated and displayed during checkout. We work with reliable agricultural logistics and courier networks across India to ensure prompt transport.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Standard Shipping:</strong> Usually takes <strong>5 to 7 business days</strong> depending on your geographical location and proximity to our farm in Tamil Nadu.</li>
                            <li><strong>Express Shipping (Select Pin Codes):</strong> Usually takes <strong>3 to 5 business days</strong>.</li>
                            <li>Please note that transit delays can occasionally occur due to weather, regional restrictions, or courier issues.</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">3. Shipment Confirmation & Order Tracking</h3>
                        <p>
                            You will receive a shipment confirmation message containing your tracking number(s) once your order has been dispatched. The tracking number will be active within 24 hours of dispatch.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">4. Delivery Addresses</h3>
                        <p>
                            It is the responsibility of the customer to provide an accurate, complete delivery address with a reachable contact number. We are not liable for non-delivery or delivery delays resulting from incorrect address inputs or locked/unreachable locations.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">5. Damages & Loss in Transit</h3>
                        <p>
                            Our team packages the grass stems securely to withstand transit. However, if you receive your order in a damaged condition, please take photos/videos of the package and contact our support team within <strong>24 hours of delivery</strong>. We will review the case to process replacements or refunds as appropriate.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">6. Contact Information</h3>
                        <p>
                            If you have any questions about the shipping and delivery of your order, please reach out to us at:
                        </p>
                        <ul className="list-none pl-0 space-y-1">
                            <li><strong>Email:</strong> contact@supernapier.com</li>
                            <li><strong>Phone:</strong> (+91) 94889 32336</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
