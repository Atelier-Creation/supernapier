import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {

    const bannerImage = "https://img.freepik.com/premium-photo/unidentified-persons-hand-is-shown-up-close-holding-blank-clipboard-front-hazy-field-green-corn-with-plenty-room-text-generative-ai_1042430-56735.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80";

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
                            Privacy <br /> Policy
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

                        <h3 className="text-2xl font-bold text-gray-900">1. Information We Collect</h3>
                        <p>
                            When you use our website or place an order for Super Napier planting material,
                            we may collect personal information such as your name, phone number, email
                            address, delivery address, and payment details. This information is required
                            to process your orders and provide efficient customer support.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">2. How We Use Your Information</h3>
                        <p>
                            The information we collect is used to process orders, arrange delivery,
                            communicate order updates, and respond to customer inquiries. We may also
                            use your contact information to share farming guidance, product updates,
                            or important service notifications related to our agricultural products.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">3. Payment Security</h3>
                        <p>
                            All payments made on our platform are processed through secure and trusted
                            payment gateways. We do not store sensitive payment information such as
                            card numbers, CVV codes, or banking passwords on our servers. Payment
                            transactions are encrypted and handled by third-party payment providers.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">4. Data Protection</h3>
                        <p>
                            We implement appropriate security measures to protect your personal
                            information from unauthorized access, misuse, or disclosure. Only
                            authorized personnel involved in order processing and customer
                            service have access to this information.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">5. Sharing of Information</h3>
                        <p>
                            We do not sell, rent, or trade your personal information to third
                            parties. Your data may only be shared with logistics partners,
                            delivery services, or payment processors when required to
                            complete your order or provide related services.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">6. Cookies and Website Usage</h3>
                        <p>
                            Our website may use cookies or similar technologies to enhance
                            user experience, analyze traffic patterns, and improve website
                            functionality. Cookies help us understand how users interact
                            with our website so we can improve our services.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">7. User Rights</h3>
                        <p>
                            You have the right to request access to the personal information
                            we hold about you. If any information is incorrect or outdated,
                            you may request corrections or updates by contacting our support
                            team through the website.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">8. Policy Updates</h3>
                        <p>
                            This Privacy Policy may be updated periodically to reflect
                            changes in services, technology, or legal requirements.
                            Any updates will be published on this page with the
                            revised effective date.
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-10">9. Contact Information</h3>
                        <p>
                            If you have any questions regarding this Privacy Policy or
                            how your personal information is handled, please contact
                            us through the contact details available on our website.
                        </p>

                    </div>

                </motion.div>
            </div>
        </motion.div>
    );
}