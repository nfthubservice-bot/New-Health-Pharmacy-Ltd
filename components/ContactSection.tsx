
import React, { useState } from 'react';
import { ContactFormState } from '../types';

interface ContactSectionProps {
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  onBack?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo, onBack }) => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
    status: 'idle'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      setErrorMessage('Please enter a complete and valid email address.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFormState(prev => ({ ...prev, status: 'error' }));
      return;
    }

    setFormState(prev => ({ ...prev, status: 'submitting' }));
    
    try {
      // Corrected URL: removed trailing underscore
      const response = await fetch('https://formspree.io/f/xgoedyoj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Inquiry from ${formState.name}`
        })
      });

      if (response.ok) {
        setFormState(prev => ({ ...prev, status: 'success' }));
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Form configuration error. Please ensure the form is active in Formspree.');
        setFormState(prev => ({ ...prev, status: 'error' }));
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection.');
      setFormState(prev => ({ ...prev, status: 'error' }));
    }
  };

  const handleReset = () => {
    setFormState({
      name: '',
      email: '',
      message: '',
      status: 'idle'
    });
    setErrorMessage('');
  };

  const whatsappUrl = `https://wa.me/234${contactInfo.phone.replace(/[^0-9]/g, '').slice(-10)}`;

  return (
    <section id="contact" className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-12 flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors font-black uppercase tracking-widest text-xs group"
          >
            <i className="fa-solid fa-arrow-left-long group-hover:-translate-x-2 transition-transform"></i>
            <span>Back to Home</span>
          </button>
        )}

        <div className="mb-16 animate-fade-up">
          <h2 className="text-4xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors uppercase leading-[0.9]">
            Connect With <br />
            <span className="text-emerald-600">New-Health Pharmacy</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="flex items-start space-x-6 group">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-5 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0 transition-all shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                  <i className="fa-solid fa-location-dot text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white transition-colors uppercase tracking-tight text-xl mb-1">Our Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium text-lg max-w-sm">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-5 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0 transition-all shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                  <i className="fa-solid fa-phone-volume text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white transition-colors uppercase tracking-tight text-xl mb-1">Call Us</h4>
                  <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium text-lg">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-5 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0 transition-all shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white">
                  <i className="fa-solid fa-clock text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white transition-colors uppercase tracking-tight text-xl mb-1">Opening Hours</h4>
                  <p className="text-slate-600 dark:text-slate-400 transition-colors font-medium text-lg">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 animate-fade-up duration-700 transition-colors relative z-10">
              {formState.status === 'success' ? (
                <div className="animate-fade-in py-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <i className="fa-solid fa-paper-plane text-3xl animate-bounce"></i>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Message Received</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-sm leading-relaxed">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <button 
                    onClick={handleReset}
                    className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 uppercase tracking-widest text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Send a Message</h3>
                    <p className="text-slate-500 font-medium">We usually respond within a few hours.</p>
                  </div>
                  
                  {formState.status === 'error' && errorMessage && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-2xl text-sm font-bold border border-amber-100 dark:border-amber-900/30 flex items-center">
                      <i className="fa-solid fa-circle-exclamation mr-3 text-lg"></i>
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formState.name}
                      onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white font-bold"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={formState.email}
                      onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white font-bold"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Your Message</label>
                    <textarea 
                      rows={4} 
                      value={formState.message}
                      onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none dark:text-white font-bold"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formState.status === 'submitting'}
                    className="w-full bg-emerald-600 text-white font-black py-6 rounded-[2rem] hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-sm group"
                  >
                    {formState.status === 'submitting' ? (
                      <span className="flex items-center justify-center">
                        <i className="fa-solid fa-spinner animate-spin mr-3"></i>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-3">
                        <span>Send Message</span>
                        <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="animate-in slide-in-from-right duration-700 lg:sticky lg:top-32">
            <div id="location" className="rounded-[3rem] overflow-hidden shadow-2xl border border-white dark:border-slate-800 h-[500px] lg:h-[750px] relative transition-colors group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.734676115858!2d7.4669176!3d9.0814426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ae8ccdd9345%3A0xf4ff10412cf436e5!2sNew-Health+Pharmacy+Ltd!5e0!3m2!1sen!2sng!4v1715000000000!5m2!1sen!2sng" 
                className="w-full h-full border-0 dark:brightness-75 dark:contrast-125 transition-all group-hover:scale-105 duration-700" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Pharmacy Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
