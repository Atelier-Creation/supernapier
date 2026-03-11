import React from "react";

export default function ContactSection() {
    return (
        <section className="w-full bg-[#273615] z-10 pb-16 pt-10 lg:pt-0 relative px-4 lg:px-15">
            <div className="mx-auto">

                {/* Heading */}
                <div className="mb-10 flex flex-col lg:items-center">
                    <div className="flex items-center justify-center mb-6 lg:w-full w-full">
                        {/* Golf Ball Icon Wrapper */}
                        <div className="w-10 h-10  rounded-full flex items-center justify-center bg-white shadow-sm">
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

                    <h2 className="text-white text-center text-4xl md:text-6xl font-semibold leading-tight] lg:w-full break-all">
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
                        <form className="space-y-5">

                            <div className="grid md:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="First Name*"
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none"
                                    required
                                />

                                <input
                                    type="email"
                                    placeholder="Your Email*"
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none"
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="Your Phone*"
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Subject*"
                                    className="w-full bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none"
                                    required
                                />
                            </div>

                            <textarea
                                placeholder="Comment"
                                className="w-full h-40 bg-[#ffffff0d] text-white placeholder:text-gray-300 px-5 py-5 rounded-xl outline-none"
                            />

                            {/* Checkbox */}
                            <label className="flex items-start gap-3 text-gray-200 lg:text-lg text-sm lg:w-3/4">
                                <input type="checkbox" className="mt-1 w-4 h-4" />
                                Save my name, email, and website in this browser for the next
                                time I comment.
                            </label>

                            {/* Button */}
                            <button
                                type="submit"
                                className="mt-3 bg-[#e6e45a] text-black px-8 py-4 rounded-xl font-medium flex items-center gap-3 hover:opacity-90"
                            >
                                <span className="w-2 h-2 bg-black rounded-full"></span>
                                Send message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}