
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  name: string;
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ name, onNavigate }) => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white pt-24 pb-12 transition-colors duration-300 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-8 group cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-transform group-hover:scale-110">
                <i className="fa-solid fa-plus-medical text-white text-2xl drop-shadow-md"></i>
              </div>
              <span className="ml-4 text-3xl font-bold tracking-tight">
                New-Health <span className="text-emerald-400">Pharmacy</span>
              </span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-xl leading-relaxed max-w-md transition-colors">
              Dedicated to providing exceptional healthcare services and premium medical products to the Abuja community. Your well-being is our lifelong commitment.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 border-b border-slate-800 pb-3 transition-colors">Quick Links</h4>
            <ul className="space-y-4 text-lg">
              <li><button onClick={() => onNavigate('home')} className="group flex items-center text-slate-400 hover:text-emerald-400 transition-colors text-left">
                <i className="fa-solid fa-chevron-right text-[10px] mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                Home
              </button></li>
              <li><button onClick={() => onNavigate('about')} className="group flex items-center text-slate-400 hover:text-emerald-400 transition-colors text-left">
                <i className="fa-solid fa-chevron-right text-[10px] mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                About Us
              </button></li>
              <li><button onClick={() => onNavigate('services')} className="group flex items-center text-slate-400 hover:text-emerald-400 transition-colors text-left">
                <i className="fa-solid fa-chevron-right text-[10px] mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                Services
              </button></li>
              <li><button onClick={() => onNavigate('gallery')} className="group flex items-center text-slate-400 hover:text-emerald-400 transition-colors text-left">
                <i className="fa-solid fa-chevron-right text-[10px] mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                Gallery
              </button></li>
              <li><button onClick={() => onNavigate('ai-hub')} className="group flex items-center text-slate-400 hover:text-emerald-400 transition-colors text-left">
                <i className="fa-solid fa-chevron-right text-[10px] mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                Ask AI
              </button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 border-b border-slate-800 pb-3 transition-colors">Connect With Us</h4>
            <div className="flex space-x-5 mb-8">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 transform hover:-translate-y-2 group shadow-lg" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f text-lg group-hover:scale-110"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] transition-all duration-300 transform hover:-translate-y-2 group shadow-lg" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-lg group-hover:scale-110"></i>
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="fa-solid fa-map-location-dot text-emerald-400 mt-1"></i>
                <div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1 transition-colors">Location</p>
                  <p className="text-slate-400 font-medium text-sm transition-colors">Behind LG, 4 Ajesa St, Wuse, Abuja<br/><span className="text-emerald-400/80">Plus Code: 3FJ8+HV Abuja</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-12 flex flex-col md:flex-row justify-between items-center text-slate-500 transition-colors">
          <p className="text-base">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0 font-medium">
            <a href="#" className="hover:text-emerald-400 transition-colors flex items-center">
              <i className="fa-solid fa-shield-halved text-xs mr-2"></i>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
