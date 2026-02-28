import React from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, Sprout } from 'lucide-react';

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-[#1B5E20] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    <div className="flex flex-col items-center">
                        <ShieldCheck className="w-16 h-16 mb-6 text-[#a3e635]" />
                        <h3 className="text-xl font-bold mb-3">Certified Quality</h3>
                        <p className="text-white/80">Every seed batch is rigorously tested for high germination rates.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <TrendingUp className="w-16 h-16 mb-6 text-[#a3e635]" />
                        <h3 className="text-xl font-bold mb-3">High Yielding</h3>
                        <p className="text-white/80">Specifically bred for maximum output in diverse climates.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CheckCircle className="w-16 h-16 mb-6 text-[#a3e635]" />
                        <h3 className="text-xl font-bold mb-3">Disease Resistant</h3>
                        <p className="text-white/80">Advanced genetics to protect your crops naturally.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Sprout className="w-16 h-16 mb-6 text-[#a3e635]" />
                        <h3 className="text-xl font-bold mb-3">Sustainable</h3>
                        <p className="text-white/80">Eco-friendly practices from farming to packaging.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
