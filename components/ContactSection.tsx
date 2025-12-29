
import React, { useState } from 'react';
import { ContactFormState } from '../types';

interface ContactSectionProps {
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo }) => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
    status: 'idle'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, status: 'submitting' }));
    
    // Simulate API call
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        message: '',
        status: 'success'
      });
      // Reset status after a few seconds
      setTimeout(() => setFormState(prev => ({ ...prev, status: 'idle' })), 5000);
    }, 1500);
  };

  const whatsappUrl = `https://wa.me/234${contactInfo.phone.replace(/[^0-9]/g, '').slice(-10)}`;

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="animate-in slide-in-from-left duration-700">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight transition-colors">Visit Us or Get in Touch</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0 transition-colors">
                  <i className="fa-solid fa-location-dot text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Our Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 transition-colors">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0 transition-colors">
                  <i className="fa-solid fa-phone-volume text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Call Us</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 transition-colors">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0 transition-colors">
                  <i className="fa-solid fa-clock text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Opening Hours</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 transition-colors">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-green-100 dark:shadow-none transition-all transform hover:-translate-y-1 active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-2xl mr-3"></i>
                Chat on WhatsApp
              </a>
            </div>

            <div id="location" className="rounded-3xl overflow-hidden shadow-xl border border-white dark:border-slate-800 h-[350px] relative scroll-mt-24 transition-colors">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.734676115858!2d7.4669176!3d9.0814426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ae8ccdd9345%3A0xf4ff10412cf436e5!2sNew-Health+Pharmacy+Ltd!5e0!3m2!1sen!2sng!4v1715000000000!5m2!1sen!2sng" 
                className="w-full h-full border-0 dark:brightness-75 dark:contrast-125" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Pharmacy Location Map"
              ></iframe>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right duration-700 transition-colors">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Send us a Message</h3>
            
            {formState.status === 'success' ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400 p-6 rounded-2xl flex flex-col items-center text-center transition-colors">
                <i className="fa-solid fa-circle-check text-4xl mb-4"></i>
                <h4 className="text-xl font-bold">Message Sent Successfully!</h4>
                <p className="mt-2 text-emerald-600 dark:text-emerald-500">Thank you for reaching out. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Your Message</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formState.message}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none dark:text-white"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formState.status === 'submitting'}
                  className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState.status === 'submitting' ? (
                    <span className="flex items-center justify-center">
                      <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
