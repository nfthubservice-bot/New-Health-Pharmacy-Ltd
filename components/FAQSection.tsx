
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 transition-colors last:border-none">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-emerald-500'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isOpen ? 'bg-emerald-600 border-emerald-600 text-white rotate-180' : 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'}`}>
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-base md:text-lg">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open Monday to Saturday, from 8:00 AM to 7:00 PM. We are closed on Sundays to allow our team to rest and recharge for the new week."
    },
    {
      question: "Do you offer home delivery in Abuja?",
      answer: "Yes, we do! New-Health Pharmacy offers prompt home delivery for prescription medications, over-the-counter drugs, and other health products within Abuja. Simply contact us via phone or WhatsApp to place your order."
    },
    {
      question: "How can I check if a medication is currently in stock?",
      answer: "You can check medication availability by calling us directly at 08039366563, chatting with our AI Assistant on this website, or messaging us on WhatsApp. We provide real-time stock verification for your convenience."
    },
    {
      question: "Do you provide professional health consultations?",
      answer: "Absolutely. Our knowledgeable pharmacists are available in-store or via phone to provide personalized health advice, medication management support, and answers to your health-related concerns."
    },
    {
      question: "Where is New-Health Pharmacy located?",
      answer: "We are located behind LG at 4 Ajesa St, Wuse, Abuja. For easy navigation, you can use our Google Plus Code: 3FJ8+HV Abuja."
    },
    {
      question: "Are your medications authentic and verified?",
      answer: "Integrity is one of our core values. We source all medications directly from reputable manufacturers and authorized distributors, ensuring 100% authenticity and clinical safety for every patient."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/20 px-4 py-1.5 rounded-full mb-6">
            <i className="fa-solid fa-circle-question text-emerald-600 dark:text-emerald-400 text-xs"></i>
            <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">Your Queries Answered</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight uppercase">Common Questions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors max-w-2xl mx-auto font-medium">
            Everything you need to know about our services, availability, and how we care for the community.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 transition-all animate-fade-up">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-up">
          <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">Still have questions?</p>
          <a 
            href="tel:08039366563" 
            className="inline-flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
          >
            <span>Talk to a Pharmacist</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
