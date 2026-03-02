import React from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, Sprout } from 'lucide-react';

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-[#FAFCF8] relative overflow-hidden">
            {/* Palm Shadow */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 right-0 h-full object-contain opacity-10 md:opacity-[0.04] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-[#0f9c40] rounded-bl-[4rem] rounded-tr-[4rem] rounded-tl-2xl rounded-br-2xl py-20 px-8 relative overflow-hidden shadow-2xl">

                    {/* Decorative Leaves */}
                    <img
                        src="/Green-Leaf-PNG.png"
                        alt="Decorative Leaf"
                        className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 object-contain opacity-30 z-0 pointer-events-none drop-shadow-2xl"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white relative z-10">
                        <div className="flex flex-col items-center">
                            <ShieldCheck className="w-16 h-16 mb-6 text-white drop-shadow-md" />
                            <h3 className="text-xl font-bold mb-3">Certified Quality</h3>
                            <p className="text-white/90 font-medium">Every seed batch is rigorously tested for high germination rates.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <TrendingUp className="w-16 h-16 mb-6 text-white drop-shadow-md" />
                            <h3 className="text-xl font-bold mb-3">High Yielding</h3>
                            <p className="text-white/90 font-medium">Specifically bred for maximum output in diverse climates.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <CheckCircle className="w-16 h-16 mb-6 text-white drop-shadow-md" />
                            <h3 className="text-xl font-bold mb-3">Disease Resistant</h3>
                            <p className="text-white/90 font-medium">Advanced genetics to protect your crops naturally.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Sprout className="w-16 h-16 mb-6 text-white drop-shadow-md" />
                            <h3 className="text-xl font-bold mb-3">Sustainable</h3>
                            <p className="text-white/90 font-medium">Eco-friendly practices from farming to packaging.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
