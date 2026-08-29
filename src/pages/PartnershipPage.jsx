import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Loader2 } from 'lucide-react';

import { pagesApi } from '../api/pagesApi';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';

import PartnershipHero from '../components/partnership/PartnershipHero';
import ProblemSolution from '../components/partnership/ProblemSolution';
import StatsGrid from '../components/partnership/StatsGrid';
import ProductApplications from '../components/partnership/ProductApplications';
import ComparisonTable from '../components/partnership/ComparisonTable';
import AgronomicServices from '../components/partnership/AgronomicServices';
import PhasedTimeline from '../components/partnership/PhasedTimeline';
import ContactFooter from '../components/partnership/ContactFooter';

const fallbackContent = {
  hero: {
    title: "Powering Your 5,000-Acre Bio-Industrial Vision",
    description: "Strategic feedstock partnership for Biofuel and Pulp Ventures. The Super Napier Team delivers excellence in biomass scalability.",
    button1Text: "Partner With Us",
    button1Link: "#contact",
    button2Text: "Download Proposal",
    button2Link: "#",
    imageSrc: { url: "/assets/partnership/hero.png", alt: "Super Napier Grass" }
  },
  pillarsSection: {
    title: "The Foundational Choice",
    subtitle: "Why industry leaders are switching to Super Napier for their bio-industrial feedstock.",
    pillars: [
      { title: "Unmatched Yield", description: "Achieve up to 200 tons per acre annually, ensuring a consistent supply for large-scale industrial needs.", iconName: "Zap" },
      { title: "Ironclad Reliability", description: "Engineered for resilience, our Super Napier slips guarantee rapid regrowth and year-round availability.", iconName: "ShieldCheck" },
      { title: "Maximum Profitability", description: "Lower input costs and high biomass density translate directly to superior ROI for biofuel and pulp ventures.", iconName: "TrendingUp" }
    ]
  },
  statsSection: {
    title: "The Super Napier Advantage",
    description: "Our specific cultivar is optimized for maximum biomass density and nutrient extraction efficiency. It's not just grass; it's a high-performance industrial asset.",
    highlights: ["High Biomass for Biofuel", "Optimal Fiber for Pulp (Kraft Paper)", "Rapid Scalability for 5,000+ Acres"],
    stats: [
      { label: "Annual Yield", value: "200", suffix: "Tons/Acre", color: "text-earthy-gold" },
      { label: "Crude Protein", value: "18", suffix: "%", color: "text-accent-lime" },
      { label: "Regrowth Cycle", value: "45", suffix: "Days", color: "text-white" },
      { label: "Water Efficiency", value: "95", suffix: "%", color: "text-cyan-400" }
    ]
  },
  applicationsSection: {
    title: "Industrial Applications",
    imageSrc: { url: "/assets/partnership/industrial.png", alt: "Industrial Biomass Context" },
    badgeValue: "95%",
    badgeText: "Conversion Efficiency in Bio-Pulping",
    applications: [
      { number: "01", title: "Biofuel Generation", description: "With a high calorific value and low ash content, our Super Napier is the ideal feedstock for second-generation ethanol production and biomass power plants." },
      { number: "02", title: "Pulp & Paper (Kraft)", description: "The optimal fiber length and cellulose-to-lignin ratio make our cultivar a superior alternative for Kraft paper production, reducing chemical consumption in pulping." }
    ]
  },
  comparisonSection: {
    title: "The Data-Driven Choice",
    subtitle: "Why \"Slips\" are the industrial standard for 5,000-acre scalability.",
    columns: ["Parameters", "Slips (Our Choice)", "Tissue Culture", "Seeds"],
    rows: [
      { feature: "Cost Effectiveness", slips: "High", tissue: "Low", seeds: "Medium" },
      { feature: "Scalability", slips: "Excellent", tissue: "Moderate", seeds: "Low" },
      { feature: "Maturity Speed", slips: "Fast", tissue: "Slow", seeds: "Very Slow" },
      { feature: "Genetic Stability", slips: "100%", tissue: "99%", seeds: "Variable" },
      { feature: "Survival Rate", slips: "98%+", tissue: "90%", seeds: "60-70%" }
    ],
    footnote: "* Data based on multi-location trials for industrial biomass production.",
    buttonText: "Get Detailed Report"
  },
  timelineSection: {
    title: "Execution Roadmap",
    subtitle: "Strategic coordination for 5,000-acre biomass infrastructure.",
    steps: [
      { phase: "Phase 01", title: "On-Site Assessment", duration: "Week 1-2", details: "Soil testing, water source verification, and land preparation blueprints." },
      { phase: "Phase 02", title: "Pilot Block Setup", duration: "Week 3-6", details: "Initial 100-acre planting to calibrate growth parameters and local adaptation." },
      { phase: "Phase 03", title: "Mass Scale Deployment", duration: "Month 2-6", details: "Synchronized delivery of slips for the remaining 4,900 acres in manageable blocks." },
      { phase: "Phase 04", title: "Industrial Harvest", duration: "Month 6+", details: "First full-scale harvest and transition to a 45-day regrowth cycle." }
    ]
  },
  servicesSection: {
    title: "Agronomic Blueprint",
    subtitle: "We don't just supply slips; we provide the entire technical ecosystem required for 5,000-acre success.",
    buttonText: "View Technical Specs",
    services: [
      { title: "Soil Analysis", description: "Detailed nutrient mapping and pH adjustment strategies to optimize your soil for Super Napier vigor.", iconName: "Beaker" },
      { title: "Planting Tech", description: "Precision spacing and depth techniques ensuring 99% survival rate across massive acreages.", iconName: "Sprout" },
      { title: "Pest Management", description: "Eco-friendly, bio-industrial grade protection against local pests without compromising biomass quality.", iconName: "Bug" },
      { title: "Harvesting Systems", description: "Mechanized harvesting schedules designed to maximize regrowth speed and fiber quality.", iconName: "Scissors" }
    ]
  },
  footerSection: {
    title: "Let’s Build a Successful Future, Together",
    description: "Partner with Ponni Seeds to secure your biomass supply chain. Our team of experts is ready to assist you in multiple languages.",
    buttons: ["English Support", "தமிழ் service (Tamil)", "हिंदी assistance (Hindi)"],
    phone: "+91 76394 44670",
    email: "partnership@ponniseeds.com"
  }
};

const fallbackSeo = {
  title: "Strategic Partnerships",
  description: "Strategic feedstock partnership for Biofuel and Pulp Ventures. The Super Napier Team delivers excellence in biomass scalability.",
  keywords: ["partnership", "biofuel", "biomass", "industrial scale"],
  ogTitle: "Partnership - Super Napier",
  ogDescription: "Strategic feedstock partnership for Biofuel and Pulp Ventures.",
  ogImage: "/assets/partnership/hero.png",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Strategic Partnerships",
    "description": "Strategic feedstock partnership for Biofuel and Pulp Ventures."
  }
};

const PartnershipPage = () => {
  const [content, setContent] = useState(fallbackContent);
  const [seo, setSeo] = useState(fallbackSeo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    pagesApi.getPageContent("partnership")
      .then(res => {
        if (res.data && res.data.success && res.data.page) {
          const page = res.data.page;
          setContent(page.content || fallbackContent);
          setSeo({
            title: page.seo?.title || fallbackSeo.title,
            description: page.seo?.description || fallbackSeo.description,
            keywords: page.seo?.keywords?.length ? page.seo.keywords : fallbackSeo.keywords,
            ogTitle: page.seo?.ogTitle || page.seo?.title || fallbackSeo.ogTitle,
            ogDescription: page.seo?.ogDescription || page.seo?.description || fallbackSeo.ogDescription,
            ogImage: page.seo?.ogImage || fallbackSeo.ogImage,
            jsonLd: page.seo?.jsonLd || fallbackSeo.jsonLd
          });
        }
      })
      .catch(err => {
        console.warn("PartnershipPage CMS endpoint offline, using default fallback content.", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-deep-forest">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-earthy-gold mb-4" />
          <p className="text-slate-white/60 font-medium">Loading Partnership details...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-white overflow-x-hidden"
    >
      {/* Dynamic SEO Meta Tags */}
      <SEO 
        title={seo.title} 
        description={seo.description} 
        keywords={seo.keywords.join(", ")} 
        image={seo.ogImage}
      />

      {/* Structured Schema JSON-LD */}
      <Helmet>
        {seo.jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(seo.jsonLd)}
          </script>
        )}
      </Helmet>

      <PartnershipHero config={content.hero} />
      
      <div id="pillars">
        <ProblemSolution config={content.pillarsSection} />
      </div>

      <div id="stats">
        <StatsGrid config={content.statsSection} />
      </div>

      <div id="applications">
        <ProductApplications config={content.applicationsSection} />
      </div>

      <div id="scalability">
        <ComparisonTable config={content.comparisonSection} />
      </div>

      <div id="timeline">
        <PhasedTimeline config={content.timelineSection} />
      </div>

      <div id="services">
        <AgronomicServices config={content.servicesSection} />
      </div>

      <div id="contact">
        <ContactFooter config={content.footerSection} />
      </div>
    </motion.div>
  );
};

export default PartnershipPage;
