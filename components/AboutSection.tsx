
import React from 'react';

const AboutSection: React.FC = () => {
  const offerings = [
    {
      title: "Prescription Medications",
      desc: "100% genuine prescription medications sourced from reputable manufacturers with highest quality checks.",
      icon: "fa-prescription-bottle-medical"
    },
    {
      title: "Over-the-Counter Drugs",
      desc: "A wide selection of non-prescription drugs for your everyday health needs, verified for safety.",
      icon: "fa-tablets"
    },
    {
      title: "Health Consultations",
      desc: "Our knowledgeable pharmacists are available to provide health advice and support, ensuring you make informed decisions about your health.",
      icon: "fa-user-doctor"
    },
    {
      title: "Medical Supplies",
      desc: "Find a variety of medical equipment and supplies for your home or professional needs with guaranteed accuracy.",
      icon: "fa-stethoscope"
    },
    {
      title: "Cosmetics Items",
      desc: "Explore our range of premium personal care and cosmetic products to look and feel your best.",
      icon: "fa-spa"
    },
    {
      title: "Provisions",
      desc: "Conveniently shop for a selection of essential household provisions and goods with a focus on hygiene.",
      icon: "fa-basket-shopping"
    }
  ];

  const values = [
    { name: "Highest Integrity", text: "We uphold the highest ethical standards, ensuring honesty in every transaction.", icon: "fa-shield-halved" },
    { name: "Professionalism", text: "Committed to continuous learning to provide expert clinical care.", icon: "fa-user-tie" },
    { name: "Empathy & Compassion", text: "We treat every customer with kindness, respect, and deep understanding.", icon: "fa-hand-holding-heart" },
    { name: "Teamwork", text: "We collaborate effectively to ensure seamless service for every patient.", icon: "fa-people-group" },
    { name: "Customer-centric", text: "Your health and satisfaction are at the heart of everything we do.", icon: "fa-heart-circle-bolt" },
    { name: "Excellence", text: "Committed to excellence in every aspect of pharmaceutical service.", icon: "fa-award" }
  ];

  return (
    <section id="about" className="bg-white dark:bg-slate-900 transition-colors duration-500 relative overflow-hidden">
      
      {/* Brand Hero Header with Image Overlay */}
      <div className="relative h-[600px] md:h-[800px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Pharmacy Environment" 
            className="w-full h-full object-cover"
          />
          {/* Dark/Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <div className="bg-emerald-500/20 backdrop-blur-md w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-white/20 shadow-2xl">
            <i className="fa-solid fa-hand-holding-heart text-4xl text-white"></i>
          </div>
          <h2 className="text-emerald-400 font-black uppercase tracking-[0.5em] text-sm mb-6">Our Commitment</h2>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.95]">
            We make health cares.<br />
            <span className="text-emerald-400">Understandable,</span><br />
            <span className="text-emerald-400">Accessible</span> and <span className="text-emerald-400">Affordable.</span>
          </h1>
          <div className="w-24 h-2 bg-emerald-500 rounded-full mx-auto mt-12 animate-pulse"></div>
        </div>
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          
          {/* Main Brand Narrative Grid */}
          <div className="grid lg:grid-cols-2 gap-16 mb-40 items-start">
            <div className="space-y-12 animate-slide-left">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-xs">
                  <i className="fa-solid fa-circle-info text-[10px]"></i>
                  <span>Who We Are, What We Do...</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] transition-colors tracking-tighter">
                  Dedicated to Providing Our Community with Premium Care.
                </h3>
                <div className="space-y-6">
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed transition-colors font-medium italic border-l-4 border-emerald-500 pl-6">
                    "At New-Health Pharmacy Ltd, we are dedicated to providing our community with accessible, high-quality pharmaceutical care and more."
                  </p>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors font-medium">
                    Established with a commitment to improving health and well-being, we have quickly become a trusted name in the pharmaceutical sector. Our team of knowledgeable pharmacists is always available to provide health advice and support, ensuring you make informed decisions about your health.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-10 animate-slide-right">
              {/* Our Mission Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-700 shadow-sm group hover:bg-emerald-600 transition-all duration-500">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-colors shadow-lg">
                    <i className="fa-solid fa-bullseye text-2xl"></i>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white transition-colors group-hover:text-white uppercase tracking-tighter">Our Mission</h4>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 group-hover:text-emerald-50 leading-relaxed transition-colors font-medium">
                  Our mission is to deliver exceptional pharmaceutical and retail services that promote health and enhance the quality of life for our customers. We believe that everyone deserves access to essential medications, provisions, and personal care products, and we strive to make that a reality for our community.
                </p>
              </div>

              {/* 24-Hour Service Card */}
              <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                  <i className="fa-solid fa-clock text-[8rem] rotate-12"></i>
                </div>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                    <i className="fa-solid fa-bolt-lightning text-2xl"></i>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-[0.1em]">24-Hour Service</h4>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed font-medium relative z-10">
                  We understand that health and wellness needs can arise at any time, which is why we proudly offer 24-hour services to ensure that you have access to the products and support you need, day or night.
                </p>
              </div>
            </div>
          </div>

          {/* Offerings Grid Section */}
          <div className="mb-40">
            <div className="text-center mb-20 animate-fade-up">
              <h3 className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-xs mb-4">Our Stock</h3>
              <p className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white transition-colors tracking-tighter uppercase">What We Offer</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offerings.map((offering, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/40 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-xl group">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 transition-all group-hover:scale-110">
                    <i className={`fa-solid ${offering.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight transition-colors">{offering.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">{offering.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-40">
            <div className="text-center mb-20 animate-fade-up">
              <h3 className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em] text-xs mb-4">Core Principles</h3>
              <p className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white transition-colors tracking-tighter uppercase">Our Values</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/50 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-700 transition-all hover:shadow-2xl hover:-translate-y-2 group">
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    <i className={`fa-solid ${val.icon} text-3xl`}></i>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 transition-colors tracking-tight">{val.name}</h4>
                  <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium leading-relaxed">{val.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
