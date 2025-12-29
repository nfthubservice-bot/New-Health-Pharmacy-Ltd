
import React from 'react';
import { Page } from '../types';

interface ValuePropItem {
  title: string;
  description: string;
  icon: string;
}

interface ValuePropositionProps {
  items: ValuePropItem[];
  onNavigate: (page: Page) => void;
}

const ValueProposition: React.FC<ValuePropositionProps> = ({ items, onNavigate }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-1 rounded-full mb-4">
            <i className="fa-solid fa-shield-heart text-emerald-600 dark:text-emerald-400 text-xs"></i>
            <h2 className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">Why Choose Us</h2>
          </div>
          <p className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 transition-colors tracking-tight uppercase">Exceptional Care</p>
          <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors font-medium">We go beyond just dispensing medicine. We partner with you for a healthier life with premium services designed around your convenience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-emerald-500/5 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className={`fa-solid ${item.icon} text-8xl`}></i>
              </div>
              
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-emerald-600 group-hover:rotate-6 transition-all duration-500 shadow-inner group-hover:shadow-emerald-500/40">
                <i className={`fa-solid ${item.icon} text-emerald-600 dark:text-emerald-400 text-3xl group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 transition-colors tracking-tight">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base transition-colors font-medium">{item.description}</p>
              
              <button 
                onClick={() => onNavigate('services')} 
                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-black mt-10 group/btn transition-colors hover:text-emerald-700"
              >
                <span className="text-sm uppercase tracking-widest">Learn more</span>
                <i className="fa-solid fa-arrow-right-long ml-3 group-hover/btn:translate-x-2 transition-transform"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
