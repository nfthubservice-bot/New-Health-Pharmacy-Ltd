
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface NavbarProps {
  pharmacyName: string;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ pharmacyName, currentPage, onNavigate, isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const navLinks: { name: string; id: Page; icon?: string }[] = [
    { name: 'Home', id: 'home', icon: 'fa-house' },
    { name: 'About', id: 'about', icon: 'fa-info-circle' },
    { name: 'Services', id: 'services', icon: 'fa-hand-holding-medical' },
    { name: 'Gallery', id: 'gallery', icon: 'fa-images' },
    { name: 'Ask AI', id: 'ai-hub', icon: 'fa-robot' },
    { name: 'Reviews', id: 'testimonials', icon: 'fa-star' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-[60] transition-all duration-500 ${
      isScrolled 
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 py-3' 
      : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center min-w-0">
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center group focus:outline-none min-w-0"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-xl shrink-0 shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-all duration-300">
                <i className="fa-solid fa-plus-medical text-white text-base sm:text-xl drop-shadow-sm"></i>
              </div>
              <span className="ml-2 sm:ml-3 text-base sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors truncate">
                New-Health <span className="text-emerald-600">Pharmacy</span>
              </span>
            </button>
          </div>
          
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)} 
                className={`flex items-center font-bold transition-all border-b-2 px-1 py-1 space-x-2 text-[10px] xl:text-xs uppercase tracking-widest ${
                  currentPage === link.id 
                  ? 'text-emerald-600 border-emerald-600' 
                  : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {link.icon && <i className={`fa-solid ${link.icon} opacity-70`}></i>}
                <span>{link.name}</span>
              </button>
            ))}
            
            <button 
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 group shadow-inner"
              aria-label="Toggle dark mode"
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun rotate-12' : 'fa-moon -rotate-12'} text-lg transition-transform group-active:scale-90`}></i>
            </button>

            <button 
              onClick={() => handleNavClick('contact')} 
              className="bg-emerald-600 text-white px-5 xl:px-7 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-md active:scale-95 flex items-center space-x-2"
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Contact</span>
            </button>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 shadow-sm"
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-base`}></i>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-400 focus:outline-none p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent">
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)} 
                className={`flex items-center w-full text-left px-5 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs ${
                  currentPage === link.id 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.icon && <i className={`fa-solid ${link.icon} w-6 mr-3 text-emerald-500`}></i>}
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')} 
              className="flex items-center justify-center w-full px-5 py-4 bg-emerald-600 text-white rounded-2xl mt-4 font-black uppercase tracking-[0.2em] text-xs shadow-lg active:scale-95 space-x-2"
            >
              <i className="fa-solid fa-envelope"></i>
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
