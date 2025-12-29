
import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const sections = [
    {
      title: "1. Data Collection",
      icon: "fa-database",
      content: "We collect information you provide directly to us when you fill out forms, book appointments, or communicate with our pharmacists. This may include your name, contact information, health history, and prescription details."
    },
    {
      title: "2. Patient Confidentiality",
      icon: "fa-user-shield",
      content: "Your medical information is strictly confidential. We adhere to the highest pharmaceutical standards and local regulations regarding health data. We never sell your health data to third parties."
    },
    {
      title: "3. Use of Information",
      icon: "fa-circle-check",
      content: "We use your information to provide pharmaceutical care, process orders, manage appointments, and communicate with you about your health services. We may also use data for internal quality improvements."
    },
    {
      title: "4. Data Security",
      icon: "fa-lock",
      content: "We implement robust security measures to protect your personal and health information. Access to your sensitive data is restricted to authorized personnel who need it to provide your care."
    },
    {
      title: "5. Cookies & Analytics",
      icon: "fa-cookie-bite",
      content: "Our website uses cookies to improve user experience and analyze traffic. You can manage your cookie preferences through your browser settings."
    },
    {
      title: "6. Your Rights",
      icon: "fa-scale-balanced",
      content: "You have the right to access, correct, or request the deletion of your personal data. To exercise these rights, please contact our privacy officer at our Wuse office."
    }
  ];

  return (
    <section className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors font-black uppercase tracking-widest text-xs group"
        >
          <i className="fa-solid fa-arrow-left-long group-hover:-translate-x-2 transition-transform"></i>
          <span>Back to Home</span>
        </button>

        <div className="mb-20 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full mb-6">
            <i className="fa-solid fa-shield-halved text-emerald-600 dark:text-emerald-400 text-xs"></i>
            <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-[10px]">Legal Standards</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors uppercase leading-[0.95]">
            Privacy <br />
            <span className="text-emerald-600">Policy</span>
          </h2>
          <p className="mt-8 text-slate-500 dark:text-slate-400 font-medium text-lg italic transition-colors">
            Last Updated: January 2025. Your trust and privacy are the foundation of our care.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                  <i className={`fa-solid ${section.icon} text-2xl`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight transition-colors uppercase">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg font-medium transition-colors">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-slate-900 rounded-[3.5rem] text-white text-center animate-fade-up">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Questions about your data?</h3>
          <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
            Our data protection officer is available to answer any questions you may have about your health records and privacy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:privacy@newhealthpharmacy.com" className="bg-emerald-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
              Email Officer
            </a>
            <a href="tel:08039366563" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95">
              Call Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
