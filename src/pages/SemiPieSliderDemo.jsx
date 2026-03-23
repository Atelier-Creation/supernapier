import React from 'react';
import SemiPieSlider from '../components/SemiPieSlider';

/**
 * Example usage of SemiPieSlider with farming/agriculture data.
 * You can drop <SemiPieSliderDemo /> anywhere in your app.
 */

const FARMING_SEGMENTS = [
  {
    id: 'organic',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    title: 'Organic Farming',
    subtitle: 'Chemical-free cultivation',
    color: '#16a34a',
  },
  {
    id: 'modern',
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Agriculture',
    subtitle: 'Precision crop management',
    color: '#15803d',
  },
  {
    id: 'napier',
    image: '/hero-slider4.jpg',
    title: 'Super Napier',
    subtitle: "World's highest-yield fodder",
    color: '#166534',
  },
  {
    id: 'harvest',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    title: 'Harvesting',
    subtitle: 'Abundant seasonal yields',
    color: '#14532d',
  },
  {
    id: 'dairy',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    title: 'Dairy Farming',
    subtitle: 'Nutrient-rich cattle feed',
    color: '#065f46',
  },
];

const SemiPieSliderDemo = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-950 to-green-900 flex flex-col items-center justify-center px-6 py-16 gap-8">
      {/* Header */}
      <div className="text-center">
        <p className="text-green-400 text-xs font-black uppercase tracking-[0.3em] mb-3">Our Services</p>
        <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-tight">
          <span className="text-green-300">Agriculture</span> Company
        </h2>
      </div>

      {/* The Slider */}
      <div className="w-full max-w-lg">
        <SemiPieSlider
          segments={FARMING_SEGMENTS}
          autoPlayInterval={3000}
          centerLabel="Since 2010"
        />
      </div>

      {/* Optional description */}
      <p className="text-green-300/60 text-sm text-center max-w-sm leading-relaxed">
        Click on any segment or let it auto-rotate to explore our full range of farming services.
      </p>
    </section>
  );
};

export default SemiPieSliderDemo;
