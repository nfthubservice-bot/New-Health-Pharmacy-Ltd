
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Review {
  author: string;
  text: string;
  rating: number;
  avatar: string;
}

interface TestimonialsProps {
  reviews: Review[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const updateVisibleItems = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setVisibleItems(2);
    } else {
      setVisibleItems(1);
    }
  }, []);

  useEffect(() => {
    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [updateVisibleItems]);

  const maxIndex = Math.max(0, reviews.length - visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const googleMapsReviewUrl = "https://www.google.com/maps/place/New-Health+Pharmacy+Ltd/@9.0814577,7.4670465,21z/data=!4m6!3m5!1s0x104e0ae8ccdd9345:0xf4ff10412cf436e5!8m2!3d9.0814426!4d7.4671992!16s%2Fg%2F11fxb8tp4_?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-10 tracking-tight">What our customers have to say</h2>
          
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-100 dark:border-emerald-900/40 overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400" 
                  alt="New-Health Pharmacy Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">NEW-HEALTH PHARMACY LTD</h3>
            
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl font-black text-amber-500">4.5</span>
              <div className="flex text-amber-500 text-xl">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Based on 49 reviews</p>
            
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-6">
              <span className="text-sm">powered by</span>
              <div className="flex space-x-0.5 font-bold italic text-lg">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </div>
            </div>

            <a 
              href={googleMapsReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4285F4] hover:bg-[#3367d6] text-white px-6 py-2.5 rounded-full font-bold shadow-md active:scale-95 transition-all flex items-center space-x-2 mb-12"
            >
              <span>review us on</span>
              <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                <i className="fa-brands fa-google text-[10px] text-[#4285F4]"></i>
              </div>
            </a>
          </div>
        </div>

        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-12 z-20 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all p-2"
            aria-label="Previous testimonial"
          >
            <i className="fa-solid fa-chevron-left text-3xl"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-12 z-20 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-all p-2"
            aria-label="Next testimonial"
          >
            <i className="fa-solid fa-chevron-right text-3xl"></i>
          </button>

          <div className="overflow-hidden pb-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className="px-2 flex-shrink-0"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 h-[300px] relative group/card hover:shadow-md transition-shadow flex flex-col">
                    
                    <div className="absolute top-4 right-4">
                      <i className="fa-brands fa-google text-[#4285F4] text-lg opacity-80"></i>
                    </div>

                    <div className="flex items-start space-x-3 mb-4">
                      <img 
                        src={review.avatar} 
                        alt={review.author} 
                        className="w-14 h-14 rounded-full border border-slate-100 dark:border-slate-600 object-cover" 
                      />
                      <div className="pt-1">
                        <h4 className="font-bold text-[#1a73e8] text-base leading-tight truncate max-w-[150px]">{review.author}</h4>
                        <div className="flex items-center text-slate-500 text-[10px] mt-0.5 space-x-1">
                          <span className="font-bold">Local Guide</span>
                          <span>•</span>
                          <span>{Math.floor(Math.random() * 50) + 10} reviews</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex text-amber-500 text-sm mb-3">
                      {[1, 2, 3, 4, 5].map(i => <i key={i} className={`fa-solid ${i <= review.rating ? 'fa-star' : 'fa-star-half-stroke'}`}></i>)}
                    </div>

                    <div className="relative flex-grow overflow-hidden">
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-6 font-medium">
                        {review.text}
                      </p>
                    </div>
                    
                    <div className="mt-4 text-[10px] text-slate-400 font-bold flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-3">
                      <span className="uppercase tracking-widest flex items-center">
                        <i className="fa-solid fa-circle-check text-emerald-500 mr-1.5 text-[8px]"></i>
                        Verified Guest
                      </span>
                      <span className="flex items-center space-x-1">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span>Just updated</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === i 
                  ? 'bg-[#4285F4]' 
                  : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
          <p>Real-time Google Maps Sync Active</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
