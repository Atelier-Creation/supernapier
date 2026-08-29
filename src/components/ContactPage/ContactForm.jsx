import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { productApi } from "../../api/productApi";
import toast from "react-hot-toast";

export default function ContactSection() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isBulkOrder = queryParams.get('source') === 'bulk' || queryParams.get('type') === 'bulk';

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');

    const fallbackProducts = [
        { _id: '1', name: { en: 'Premium Super Napier Grass' } },
        { _id: '2', name: { en: 'Small Napier Grass' } }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await productApi.getAllProducts();
                if (res.data && res.data.data) {
                    setProducts(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch products for inquiry", err);
            }
        };
        fetchProducts();
    }, []);

    // Set initial subject if it is bulk order
    useEffect(() => {
        if (isBulkOrder && !subject) {
            setSubject('Bulk Order Inquiry');
        }
    }, [isBulkOrder, subject]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const submission = {
            firstName,
            email,
            phone,
            subject,
            comment,
            products: isBulkOrder ? selectedProducts : []
        };
        
        console.log("Inquiry Submitted:", submission);
        toast.success("Thank you for your inquiry! Our team will contact you soon.");
        
        // Reset form
        setFirstName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setComment('');
        setSelectedProducts([]);
    };

    return (
        <section className="w-full bg-[#273615] z-10 pb-16 pt-10 lg:pt-0 relative px-4 lg:px-15">
            <div className="mx-auto">

                {/* Heading */}
                <div className="mb-10 flex flex-col lg:items-center">
                    <div className="flex items-center justify-center mb-6 lg:w-full w-full">
                        {/* Golf Ball Icon Wrapper */}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm">
                            <img
                                src="https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6911b3767fad8b2d6afff46e_golf.svg"
                                alt="golf"
                                className="w-5 h-5"
                            />
                        </div>

                        {/* Pill Badge */}
                        <div className="bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm">
                            <span className="text-[#0B2C1F] text-xs font-bold tracking-widest uppercase">
                                Contact us
                            </span>
                        </div>
                    </div>

                    <h2 className="text-white text-center text-4xl md:text-6xl font-semibold leading-tight lg:w-full break-all">
                        Always ready to <br /> answer your questions
                    </h2>
                </div>

                {/* Form Wrapper */}
                <div className="border border-[#355322] rounded-[25px] flex flex-col-reverse lg:flex-row">

                    {/* Left Image */}
                    <div className="w-full relative flex items-end">
                        <div className="w-full h-full flex items-end justify-center xl:ml-[35px] xl:mt-[-105px]">
                            <img
                                src="/conImg-2.png"
                                alt="contact-us-woman"
                                className="xl:h-[690px] w-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="w-full py-10 px-5 lg:px-0 lg:pe-10">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="grid md:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="First Name*"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none border border-transparent focus:border-[#e6e45a]/30 transition-all"
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Your Email*"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none border border-transparent focus:border-[#e6e45a]/30 transition-all"
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="Your Phone*"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none border border-transparent focus:border-[#e6e45a]/30 transition-all"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Subject*"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none border border-transparent focus:border-[#e6e45a]/30 transition-all"
                                    required
                                />
                            </div>

                            {/* Product Multi-select checkbox grid for Bulk Order inquiries */}
                            {isBulkOrder && (
                                <div className="space-y-3 bg-[#ffffff05] border border-[#ffffff10] rounded-xl p-5 animate-in fade-in duration-200">
                                    <p className="text-gray-300 text-xs font-bold uppercase tracking-wider">Select Products for Bulk Inquiry*</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {(products.length > 0 ? products : fallbackProducts).map(prod => {
                                            const name = typeof prod.name === 'object' ? (prod.name?.en || 'Product') : prod.name;
                                            const isChecked = selectedProducts.includes(prod._id);
                                            return (
                                                <label key={prod._id} className="flex items-center gap-3 text-white text-sm cursor-pointer select-none font-semibold hover:text-gray-200 transition-colors">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedProducts([...selectedProducts, prod._id]);
                                                            } else {
                                                                setSelectedProducts(selectedProducts.filter(id => id !== prod._id));
                                                            }
                                                        }}
                                                        className="w-4 h-4 rounded accent-[#e6e45a] cursor-pointer" 
                                                    />
                                                    <span>{name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <textarea
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full h-40 bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none border border-transparent focus:border-[#e6e45a]/30 transition-all resize-none"
                            />

                            {/* Checkbox */}
                            <label className="flex items-start gap-3 text-gray-200 lg:text-lg text-sm lg:w-3/4 cursor-pointer select-none">
                                <input type="checkbox" className="mt-1.5 w-4 h-4 accent-[#e6e45a]" />
                                <span className="text-sm font-semibold">Save my name, email, and website in this browser for the next time I comment.</span>
                            </label>

                            {/* Button */}
                            <button
                                type="submit"
                                className="mt-3 bg-[#e6e45a] text-black px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:opacity-90 transition-all hover:scale-[1.01] active:scale-95 shadow-lg"
                            >
                                <span className="w-2 h-2 bg-black rounded-full"></span>
                                Send inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}