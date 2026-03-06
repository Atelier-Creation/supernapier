import React from "react";

export default function MapSection() {
    return (
        <section className="w-full">
            <div className="mx-auto lg:px-20 px-5 py-10">
                {/* Map */}
                <div className="w-full h-[40vh] md:h-[60vh] lg:h-[90vh] rounded-3xl overflow-hidden shadow-xl">
                    <iframe
                        title="Google Map Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.548884128226!2d79.32117887440569!3d11.425865146880332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab355a4d3b2cef%3A0x9961179a817c1553!2ssuper%20napier!5e1!3m2!1sen!2sin!4v1772797474184!5m2!1sen!2sin"
                        className="w-full h-full border-0"
                        loading="lazy"
                    ></iframe>
                </div>

            </div>
        </section>
    );
}