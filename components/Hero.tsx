
import React from 'react';
import { Page } from '../types';

interface HeroProps {
  name: string;
  tagline: string;
  hook: string;
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ hook, onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Health Center" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/95 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center space-x-3 bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-emerald-400/30 mb-8 shadow-2xl">
            <i className="fa-solid fa-star text-emerald-400 text-xs animate-pulse"></i>
            <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px]">Abuja's Trusted Partner</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter transition-all uppercase">
            New-Health <br />
            <span className="text-emerald-500 drop-shadow-sm">Pharmacy Ltd</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed max-w-4xl mx-auto font-bold transition-colors drop-shadow-md">
            {hook || "Your Premier Wholesale Pharmacy for Medications Supplements, Skincare, & More. Elevate Your Wellness with Us."}
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <a 
              href="tel:08039366563"
              className="bg-emerald-600 text-white px-12 py-6 rounded-full text-lg font-black hover:bg-emerald-700 transition-all transform hover:-translate-y-1 shadow-2xl shadow-emerald-600/30 active:scale-95 inline-flex items-center justify-center space-x-4 uppercase tracking-[0.15em]"
            >
              <i className="fa-solid fa-phone-volume text-xl opacity-90"></i>
              <span>Call Now</span>
            </a>
            <button 
              onClick={() => onNavigate('gallery')}
              className="bg-white/10 backdrop-blur-lg text-white border-2 border-white/20 px-12 py-6 rounded-full text-lg font-black hover:bg-white/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center shadow-2xl uppercase tracking-[0.15em] group"
            >
              <i className="fa-solid fa-images mr-3 text-emerald-400 group-hover:scale-110 transition-transform"></i>
              View Facility
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
