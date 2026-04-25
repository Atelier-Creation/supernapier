import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

const ContactFooter = () => {
  return (
    <footer className="bg-slate-white pt-16 md:pt-24 pb-12 md:pb-16 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="text-center lg:text-left" data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-bold text-deep-forest mb-6 md:mb-8">
              Let’s Build a <span className="text-earthy-gold">Successful Future</span>, Together
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
              Partner with Ponni Seeds to secure your biomass supply chain. Our team of experts is ready to assist you in multiple languages.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 mb-8 md:mb-12">
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold hover:border-earthy-gold transition-all shadow-sm text-sm md:text-base">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-earthy-gold" /> English Support
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold hover:border-earthy-gold transition-all shadow-sm text-sm md:text-base">
                தமிழ் சேவை (Tamil)
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold hover:border-earthy-gold transition-all shadow-sm text-sm md:text-base">
                हिंदी सहायता (Hindi)
              </button>
            </div>

            <div className="space-y-6 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-4 text-deep-forest">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-deep-forest text-white rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider">Call Our Experts</div>
                  <div className="text-lg md:text-xl font-black">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-deep-forest">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-deep-forest text-white rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider">Email Inquiry</div>
                  <div className="text-lg md:text-xl font-black">partnership@ponniseeds.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-deep-forest p-8 md:p-10 lg:p-16 rounded-[2rem] md:rounded-[3rem] text-slate-white shadow-2xl relative overflow-hidden mt-8 lg:mt-0" data-aos="fade-left">
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-earthy-gold/10 rounded-bl-full"></div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Request a Partnership Proposal</h3>
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-[10px] md:text-sm font-bold mb-1 md:mb-2 uppercase tracking-widest opacity-60">Full Name</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg md:rounded-xl px-4 py-2 md:py-3 focus:outline-none focus:border-earthy-gold transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] md:text-sm font-bold mb-1 md:mb-2 uppercase tracking-widest opacity-60">Company</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-lg md:rounded-xl px-4 py-2 md:py-3 focus:outline-none focus:border-earthy-gold transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] md:text-sm font-bold mb-1 md:mb-2 uppercase tracking-widest opacity-60">Proposed Acreage</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg md:rounded-xl px-4 py-2 md:py-3 focus:outline-none focus:border-earthy-gold transition-all appearance-none">
                  <option className="bg-deep-forest">100 - 500 Acres</option>
                  <option className="bg-deep-forest">500 - 2,000 Acres</option>
                  <option className="bg-deep-forest">2,000 - 5,000 Acres</option>
                  <option className="bg-deep-forest">5,000+ Acres</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] md:text-sm font-bold mb-1 md:mb-2 uppercase tracking-widest opacity-60">Message</label>
                <textarea rows="4" className="w-full bg-white/10 border border-white/20 rounded-lg md:rounded-xl px-4 py-2 md:py-3 focus:outline-none focus:border-earthy-gold transition-all"></textarea>
              </div>
              <button className="w-full bg-earthy-gold text-deep-forest font-black py-3 md:py-4 rounded-lg md:rounded-xl hover:bg-white hover:scale-[1.02] transition-all transform uppercase tracking-widest text-sm md:text-base">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl md:text-2xl font-black text-deep-forest">PONNI<span className="text-earthy-gold">SEEDS</span></div>
          <p className="text-sm md:text-base text-gray-500 font-medium text-center">© 2026 The Super Napier Team. All Rights Reserved.</p>
          <div className="flex gap-6 md:gap-8 font-bold text-deep-forest text-[10px] md:text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-earthy-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-earthy-gold transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
