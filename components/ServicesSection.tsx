
import React from 'react';
import { Page } from '../types';

interface ServicesSectionProps {
  onNavigate?: (page: Page) => void;
}

const services = [
  {
    title: "Personalized Health Consultations",
    description: "In-store or telephonic consultations with expert pharmacists to offer personalized health advice, medication management, and recommendations.",
    icon: "fa-comment-medical"
  },
  {
    title: "Medical Equipment and Supply Sales",
    description: "Providing essential medical supplies such as blood pressure monitors, diabetes care products, mobility aids, and first aid essentials.",
    icon: "fa-stethoscope"
  },
  {
    title: "Health Screenings",
    description: "Providing basic health screening services, such as blood pressure checks, blood sugar tests, and cholesterol monitoring.",
    icon: "fa-heart-pulse"
  },
  {
    title: "Chronic Disease Support",
    description: "Specialized services for managing chronic conditions like diabetes, hypertension, and asthma, including support and education.",
    icon: "fa-hand-holding-medical"
  },
  {
    title: "Wellness and Lifestyle Products",
    description: "Selling vitamins, supplements, and wellness products to help customers achieve a healthy lifestyle.",
    icon: "fa-leaf"
  },
  {
    title: "Home Delivery of Medications",
    description: "Offering delivery services for prescription medications and health products to customers who prefer the convenience of home delivery.",
    icon: "fa-truck-fast"
  }
];

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full mb-6">
            <i className="fa-solid fa-wand-magic-sparkles text-emerald-600 dark:text-emerald-400 text-xs"></i>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px]">What we provide</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors tracking-tight uppercase">Our Professional Services</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors max-w-2xl mx-auto font-medium">
            Experience comprehensive pharmaceutical care designed with your family's health and convenience in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl dark:hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <i className={`fa-solid ${service.icon} text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors tracking-tight">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base transition-colors font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative group animate-fade-up">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3.5rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative bg-white dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 p-8 md:p-16 rounded-[3.5rem] shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <i className="fa-solid fa-user-doctor text-[12rem] rotate-12"></i>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-600 text-white rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-2xl shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-500">
                <i className="fa-solid fa-user-doctor text-4xl md:text-5xl"></i>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">Health Consultations</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Our knowledgeable pharmacists are available to provide health advice and support, ensuring you make informed decisions about your health.
                </p>
              </div>
              
              <div className="shrink-0 flex flex-col gap-4 w-full lg:w-auto">
                <button 
                  onClick={() => onNavigate?.('contact')} 
                  className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 text-center uppercase tracking-widest"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
