
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import ServicesSection from './components/ServicesSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import BookingSection from './components/BookingSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from './components/Footer';
import { fetchPharmacyContent } from './services/geminiService';
import { PharmacyData, Page } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<PharmacyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollTargetRef = useRef<Page | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchPharmacyContent();
      setData(content);
      setLoading(false);
    };
    loadContent();
  }, []);

  const standalonePages: Page[] = ['booking', 'contact', 'privacy'];
  const isStandalone = standalonePages.includes(currentPage);

  useEffect(() => {
    if (scrollTargetRef.current && !isStandalone) {
      const target = scrollTargetRef.current;
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        scrollTargetRef.current = null;
      } else if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollTargetRef.current = null;
      }
    }
  }, [currentPage, isStandalone]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Only track scroll-spy on the home view
      if (!isStandalone) {
        const sections: Page[] = ['home', 'about', 'services', 'testimonials'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= -250 && rect.top <= 350) {
              setCurrentPage(section);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, isStandalone]);

  const handleNavigate = (page: Page) => {
    if (standalonePages.includes(page)) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollTargetRef.current = page;
      setCurrentPage(page);
      // If we are navigating to home or a section while already "home", scroll immediately
      const element = document.getElementById(page);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        scrollTargetRef.current = null;
      } else if (page === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollTargetRef.current = null;
      }
    }
  };

  const scrollToTop = () => {
    handleNavigate('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-emerald-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <i className="fa-solid fa-plus-medical text-emerald-500 text-xl animate-pulse"></i>
          </div>
        </div>
        <p className="mt-8 text-slate-800 dark:text-slate-200 font-black uppercase tracking-[0.3em] text-sm animate-pulse">New-Health Standards</p>
      </div>
    );
  }

  if (!data) return null;

  const whatsappUrl = `https://wa.me/234${data.contactInfo.phone.replace(/[^0-9]/g, '').slice(-10)}`;

  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300 text-slate-900 dark:text-slate-100">
      <Navbar 
        pharmacyName={data.name} 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />
      
      <main className="flex-grow pt-0">
        {currentPage === 'booking' ? (
          <div className="animate-fade-in">
            <BookingSection onBack={() => handleNavigate('home')} />
          </div>
        ) : currentPage === 'contact' ? (
          <div className="animate-fade-in">
            <ContactSection contactInfo={data.contactInfo} onBack={() => handleNavigate('home')} />
          </div>
        ) : currentPage === 'privacy' ? (
          <div className="animate-fade-in">
            <PrivacyPolicy onBack={() => handleNavigate('home')} />
          </div>
        ) : (
          <>
            <div id="home" className="animate-fade-in">
              <Hero 
                name={data.name} 
                tagline={data.tagline} 
                hook={data.heroHook} 
                onNavigate={handleNavigate}
              />
            </div>

            <div className="animate-fade-up delay-100">
              <ValueProposition items={data.valueProps} onNavigate={handleNavigate} />
            </div>

            <div id="about" className="animate-fade-up delay-200">
              <AboutSection />
            </div>

            <div id="services" className="animate-fade-up delay-300">
              <ServicesSection onNavigate={handleNavigate} />
            </div>

            <div id="testimonials" className="animate-fade-up delay-500">
              <Testimonials reviews={data.reviews} />
            </div>

            <div className="animate-fade-up delay-550">
              <FAQSection />
            </div>

            <div className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Ready to prioritize your health?</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium transition-colors italic">Visit us at {data.contactInfo.address} or schedule a consultation today.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => handleNavigate('booking')} className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 dark:shadow-none active:scale-95 uppercase tracking-widest">
                    Book Appointment
                  </button>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-10 py-5 rounded-full font-black text-lg hover:shadow-xl hover:shadow-green-500/20 dark:shadow-none transition-all flex items-center justify-center active:scale-95 uppercase tracking-widest"
                  >
                    <i className="fa-brands fa-whatsapp text-2xl mr-3"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <div className="fixed bottom-8 right-8 z-[100] flex flex-col space-y-4 items-end">
        <button 
          onClick={scrollToTop}
          className={`w-14 h-14 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'} hover:bg-slate-800 dark:hover:bg-emerald-700 active:scale-90 border border-white/10`}
          aria-label="Scroll to top"
        >
          <i className="fa-solid fa-arrow-up text-xl"></i>
        </button>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group border border-white/20"
          aria-label="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp text-3xl"></i>
          <span className="absolute right-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-3 rounded-2xl shadow-xl font-black text-xs uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden md:block border border-slate-100 dark:border-slate-700">
            Chat with us
          </span>
        </a>
      </div>

      <Footer name={data.name} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
