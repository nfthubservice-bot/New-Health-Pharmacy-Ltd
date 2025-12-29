
import React, { useState } from 'react';

interface GalleryImage {
  url: string;
  caption: string;
  description: string;
  details: string[];
  link?: string;
}

const PharmacyGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      url: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1200",
      caption: "Retail Hall & Security",
      description: "Our flagship facility in Wuse features a state-of-the-art monitoring system, premium marble flooring, and an organized retail space designed for your convenience and safety.",
      details: ["24/7 CCTV Monitoring", "Marble-Finished Interior", "Standardized Shopping Carts", "Precision-Stocked Aisles"],
      link: "https://www.google.com/maps/place/New-Health+Pharmacy+Ltd/@9.0814426,7.4671992,16z"
    },
    {
      url: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=1200", 
      caption: "Premier Wuse Location",
      description: "Centrally located at 4 Ajesa St, behind LG. Our facility stands as Abuja's trusted hub for authentic medications and professional healthcare advice.",
      details: ["Behind LG, Ajesa Street", "Abuja Health Hub", "Professional Pharmacists", "Secure Customer Parking"]
    },
    {
      url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200",
      caption: "Global Wellness Brands",
      description: "A comprehensive selection of verified international supplements and vitamins, including Centrum, Vitacap, and advanced immune-support formulas.",
      details: ["Certified Global Stock", "Immune System Support", "Pediatric Wellness", "Verified Authenticity"]
    },
    {
      url: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=1200",
      caption: "Clinical Medication Care",
      description: "Specialized inventory management for analgesics and chronic care medications. We ensure every product is sourced directly for clinical integrity.",
      details: ["Extensive Pain Relief Stock", "Chronic Disease Support", "Temperature-Controlled Storage", "Expert Dispensing"]
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-500 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-1.5 rounded-full mb-6">
            <i className="fa-solid fa-camera text-emerald-600 dark:text-emerald-400 text-xs"></i>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-[10px]">Inside New-Health</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 transition-colors tracking-tight uppercase">Facility Showcase</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors font-medium">
            Explore our state-of-the-art facility in Wuse, Abuja. Where clinical precision meets modern pharmaceutical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-child">
          {images.map((img, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(img)}
              className="group relative h-[550px] rounded-[3.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl cursor-pointer bg-slate-200 dark:bg-slate-800"
            >
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full w-fit mb-4 shadow-lg shadow-emerald-500/20">View Facility</span>
                <h4 className="text-white font-black uppercase tracking-[0.1em] text-xl mb-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">{img.caption}</h4>
                <div className="w-12 h-1.5 bg-emerald-500 rounded-full translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75 mb-4"></div>
                <p className="text-slate-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 line-clamp-3 font-medium">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"></div>
          
          <div 
            className="relative max-w-7xl w-full bg-white dark:bg-slate-900 rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row animate-fade-up border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 z-10 w-16 h-16 rounded-full bg-slate-900/50 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-xl transition-all duration-300 active:scale-90 shadow-2xl"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>

            <div className="lg:w-3/5 h-[350px] lg:h-[800px] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.15)]"></div>
            </div>

            <div className="lg:w-2/5 p-12 md:p-20 flex flex-col justify-center bg-white dark:bg-slate-900 transition-colors">
              <div className="flex items-center space-x-5 mb-10">
                <div className="bg-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                  <i className="fa-solid fa-check-double text-2xl"></i>
                </div>
                <div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] block mb-1">Facility Verified</span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">New-Health Standards</span>
                </div>
              </div>
              
              <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight uppercase leading-[0.9]">
                {selectedImage.caption}
              </h3>
              
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium transition-colors mb-10">
                {selectedImage.description}
              </p>

              <div className="space-y-4 mb-12">
                <h5 className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[11px] mb-6">Facility Details:</h5>
                {selectedImage.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-4 group/item">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 group-hover/item:scale-150 shadow-lg shadow-emerald-500/40 transition-transform"></div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold text-lg tracking-tight transition-colors">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {selectedImage.link && (
                  <a 
                    href={selectedImage.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-7 bg-emerald-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs hover:shadow-3xl hover:shadow-emerald-500/40 transition-all duration-500 active:scale-95 text-center flex items-center justify-center gap-4 group"
                  >
                    <i className="fa-solid fa-location-dot text-lg group-hover:animate-bounce"></i>
                    Get Directions
                  </a>
                )}
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs hover:shadow-3xl transition-all duration-500 active:scale-95 border border-white/10"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PharmacyGallery;
