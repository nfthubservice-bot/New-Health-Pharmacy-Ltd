
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
    <section className="relative min-h-[35vh] lg:min-h-[380px] flex items-center justify-center overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Pharmacy Interior" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/95 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-8 lg:pt-28 lg:pb-10 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center space-x-3 bg-emerald-500/20 backdrop-blur-md px-4 py-1 rounded-full border border-emerald-400/30 mb-4 shadow-2xl">
            <i className="fa-solid fa-star text-emerald-400 text-[8px] animate-pulse"></i>
            <span className="text-emerald-400 font-black uppercase tracking-[0.2em] text-[8px]">We offer wide range of services and products</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-[0.95] mb-4 tracking-tighter transition-all uppercase">
            New-Health <br />
            <span className="text-emerald-500 drop-shadow-sm">Pharmacy Ltd</span>
          </h1>

          <p className="text-xs md:text-sm lg:text-base text-slate-300 mb-6 leading-relaxed max-w-xl mx-auto font-bold transition-colors drop-shadow-md">
            {hook || "Your Premier Wholesale Pharmacy for Medications Supplements, Skincare, & More. Elevate Your Wellness with Us."}
          </p>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center items-center">
            <a 
              href="tel:08039366563"
              className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-3 rounded-full text-xs font-black hover:bg-emerald-700 transition-all transform hover:-translate-y-1 shadow-2xl shadow-emerald-600/30 active:scale-95 inline-flex items-center justify-center space-x-3 uppercase tracking-[0.2em]"
            >
              <i className="fa-solid fa-phone-volume opacity-90 text-[10px]"></i>
              <span>Call Now</span>
            </a>
            <button 
              onClick={() => onNavigate('booking')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-lg text-white border border-white/20 px-6 py-3 rounded-full text-xs font-black hover:bg-white/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center shadow-2xl uppercase tracking-[0.2em] group"
            >
              <i className="fa-solid fa-calendar-check mr-2 text-emerald-400 group-hover:scale-110 transition-transform text-[10px]"></i>
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
