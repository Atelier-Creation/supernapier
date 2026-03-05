import React from "react";

export default function MapSection() {
    return (
        <section className="w-full">
            <div className="mx-auto lg:px-20 px-5 pb-10">
                {/* Map */}
                <div className="w-full h-[40vh] md:h-[60vh] lg:h-[90vh] rounded-3xl overflow-hidden shadow-xl">
                    <iframe
                        title="Google Map Location"
                        src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                    ></iframe>
                </div>

            </div>
        </section>
    );
}