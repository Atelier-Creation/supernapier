import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search, Sparkles, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const FAQ_DATA = [
  {
    id: 1,
    category: "Super Napier",
    question: "What is Super Napier (Pakchong 1) grass and why is it superior?",
    answer: "Super Napier (Pakchong 1) is a fast-growing hybrid fodder grass originally developed in Thailand. It delivers an extraordinary yield of up to 180–200 tons of fresh green fodder per acre annually. With a high crude protein content of 14%–18%, non-hairy leaves, and sweet juicy stems, it significantly enhances livestock health and boosts milk yield by 15%–25%.",
    highlight: "Yields up to 200 tons/acre per year with 14%–18% protein."
  },
  {
    id: 2,
    category: "Super Napier",
    question: "How do I plant Super Napier slips / stem cuttings?",
    answer: "Prepare the field with ridges spaced 2 to 3 feet apart. Plant the certified 2-node slips at a 45-degree angle, ensuring one node is buried 2–3 inches deep in moist soil while the second node remains just above ground level. Irrigate immediately after planting. Sprouts emerge within 7 to 10 days with a 95%+ success rate.",
    highlight: "Plant at 45° angle with 1 node buried in moist soil."
  },
  {
    id: 3,
    category: "Harvest & Yield",
    question: "When is the first harvest ready, and how frequently can it be cut?",
    answer: "The first harvest is ready 75 to 90 days after planting, when the grass reaches 8 to 10 feet. Subsequent ratoons (cuttings) can be harvested every 45 to 55 days. Once established, a single plantation continues producing high yields for 5 to 7 years without replanting.",
    highlight: "1st cut in 75–90 days; subsequent cuts every 45–55 days for 5–7 years."
  },
  {
    id: 4,
    category: "Fodder Seeds",
    question: "What are the germination rates and qualities of your organic seeds?",
    answer: "All our seed varieties—including Hedge Lucerne (Desmanthus), Moringa PKM-1, Agathi (Sesbania), and Soundal (Subabul)—are hand-sorted and laboratory tested, guaranteeing 90% to 98% germination. Every batch is packaged with pre-soaking instructions and seed treatment guidelines for maximum seedling vigor.",
    highlight: "90%–98% tested germination with pre-soaking cultivation guides."
  },
  {
    id: 5,
    category: "Harvest & Yield",
    question: "How much Super Napier fodder is needed per cow or buffalo daily?",
    answer: "An adult milking dairy cow or buffalo requires approximately 25 to 35 kg of fresh green fodder per day, ideally balanced with a protein-rich legume like Hedge Lucerne (Desmanthus) or Agathi. One acre of Super Napier comfortably supports 10 to 15 dairy animals round the year.",
    highlight: "25–35 kg/day per animal; 1 acre sustains 10–15 adult cattle."
  },
  {
    id: 6,
    category: "Cultivation & Care",
    question: "Can Super Napier grow in diverse soils and drought conditions?",
    answer: "Yes! Super Napier possesses a deep, extensive fibrous root network that allows it to withstand dry spells once rooted. It thrives across diverse Indian agro-climates and adapts to sandy loam, red soil, and black clay with soil pH ranging from 5.5 to 8.5. Drip irrigation or flood irrigation every 10–14 days ensures peak growth.",
    highlight: "Highly drought-tolerant deep roots; thrives in pH 5.5 to 8.5 soils."
  },
  {
    id: 7,
    category: "Orders & Delivery",
    question: "How do you pack and safely deliver live stem slips and seeds across India?",
    answer: "We supply freshly harvested, disease-free parent stem cuttings treated with root hormone and moisture-retaining coco-peat packaging. Dispatched via express courier partners (Shiprocket, India Speed Post), parcels reach all major states across North, South, East, and Western India within 3 to 5 business days in fresh, ready-to-plant condition.",
    highlight: "Moisture-treated air packaging; delivered in 3–5 days across India."
  },
  {
    id: 8,
    category: "Fodder Seeds",
    question: "Why should I intercrop Hedge Lucerne (Velimasal) with Super Napier?",
    answer: "Intercropping Super Napier (a carbohydrate and fiber powerhouse) with Hedge Lucerne (a nitrogen-fixing legume boasting 20%–22% crude protein) creates a nutritionally balanced fodder mix. It enriches the soil naturally, reduces reliance on expensive cattle feed concentrates, and enhances milk fat and SNF levels.",
    highlight: "Balanced fiber + 22% protein mix that cuts cattle feed costs by 40%."
  },
  {
    id: 9,
    category: "Cultivation & Care",
    question: "Do you provide after-sales planting and agronomist guidance?",
    answer: "Yes! Every order includes a complimentary digital Plantation Guide PDF. Our in-house agriculture team is also available via WhatsApp and phone support to assist you with land preparation, fertilizer schedules, and pest management throughout your cultivation journey.",
    highlight: "Free PDF Plantation Guide & dedicated WhatsApp agronomy support."
  }
];

const CATEGORIES = ["All", "Super Napier", "Fodder Seeds", "Harvest & Yield", "Cultivation & Care", "Orders & Delivery"];

export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(1); // Default first item open

  // Filtered FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Schema.org FAQPage structured data for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${faq.answer} ${faq.highlight ? `(${faq.highlight})` : ""}`
      }
    }))
  };

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAFCF8] relative overflow-hidden">
      {/* Google FAQ Schema */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Decorative Palm Shadow Accent */}
      <img
        src="/palm-tree-shadow.avif"
        alt="Palm Shadow"
        className="absolute top-0 right-0 h-full object-contain opacity-5 pointer-events-none z-0"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#F1F8E9] text-[#1B5E20] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#1B5E20]/20 mb-4 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#1B5E20]" />
            <span>Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight"
          >
            Everything You Need To Know About Our <span className="text-[#1B5E20]">Fodder & Seeds</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-600 text-base md:text-lg font-medium leading-relaxed"
          >
            Have questions about planting techniques, protein yields, soil suitability, or pan-India delivery? We have answers.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 relative max-w-xl mx-auto"
          >
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g., yield, protein, spacing, delivery)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20]/30 focus:border-[#1B5E20] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8 md:mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25 scale-105"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#1B5E20]/40 hover:text-[#1B5E20]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                    isOpen
                      ? "border-[#1B5E20]/50 shadow-md ring-1 ring-[#1B5E20]/20"
                      : "border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-sm"
                  }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 md:gap-4 flex-1">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-0.5 transition-colors ${
                        isOpen ? "bg-[#1B5E20] text-white" : "bg-[#F1F8E9] text-[#1B5E20] group-hover:bg-[#e4f2d8]"
                      }`}>
                        {faq.id}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-wider bg-[#F1F8E9] px-2 py-0.5 rounded-full inline-block mb-1.5">
                          {faq.category}
                        </span>
                        <h3 className={`text-base md:text-lg font-bold leading-snug transition-colors ${
                          isOpen ? "text-[#1B5E20]" : "text-gray-900 group-hover:text-[#1B5E20]"
                        }`}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-[#1B5E20] text-white rotate-180" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-5 pb-6 md:px-6 md:pb-6 pt-1 border-t border-gray-100/80">
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed pl-10 md:pl-11">
                            {faq.answer}
                          </p>

                          {/* Key Highlight Pill */}
                          {faq.highlight && (
                            <div className="mt-4 ml-10 md:ml-11 flex items-center gap-2 bg-[#F1F8E9] text-[#1B5E20] border border-[#1B5E20]/20 rounded-xl px-3.5 py-2 text-xs font-semibold">
                              <Sparkles className="w-4 h-4 flex-shrink-0 text-[#1B5E20]" />
                              <span>{faq.highlight}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-gray-800">No questions found</h4>
              <p className="text-xs text-gray-500 mt-1">Try searching with different keywords like "yield", "protein", or "seeds".</p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-bold bg-[#F1F8E9] text-[#1B5E20] hover:bg-[#e2f2d4] transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Agri-Expert Help Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="relative z-10 text-center md:text-left">
            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
              Free Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Have questions about your farm's soil or livestock?
            </h3>
            <p className="text-white/85 text-xs sm:text-sm mt-1 max-w-md font-medium">
              Our agriculture agronomists provide personalized recommendations on fodder spacing, yield planning, and feeding ratios.
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10 flex-shrink-0 flex-wrap justify-center">
            <a
              href="https://wa.me/917639444670?text=Hello%20SuperNapier!%20I%20have%20questions%20about%20fodder%20cultivation%20for%20my%20farm."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>

            <a
              href="tel:+917639444670"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-full border border-white/30 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Subtle Background Leaf Accent */}
          <img
            src="/Green-Leaf-PNG.png"
            alt=""
            className="absolute -right-8 -bottom-10 w-44 h-44 object-contain opacity-20 pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
