
import React, { useState } from 'react';
import { BookingFormState } from '../types';

interface BookingSectionProps {
  onBack?: () => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({ onBack }) => {
  const [form, setForm] = useState<BookingFormState>({
    name: '',
    phone: '',
    address: '',
    needs: '',
    date: '',
    status: 'idle'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const cleanPhone = form.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMessage('Please provide a complete phone number (e.g., 0803 000 0000).');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setForm(prev => ({ ...prev, status: 'error' }));
      return;
    }

    setForm(prev => ({ ...prev, status: 'submitting' }));
    
    try {
      // Corrected URL: removed trailing underscore
      const response = await fetch('https://formspree.io/f/xgoedyoj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          needs: form.needs,
          appointment_date: form.date,
          _subject: `New Slot Booking Request: ${form.name}`
        })
      });

      if (response.ok) {
        setForm(prev => ({ ...prev, status: 'success' }));
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Form error. Please verify the Formspree ID is active.');
        setForm(prev => ({ ...prev, status: 'error' }));
      }
    } catch (error) {
      setErrorMessage('Network error. Your booking might not have been sent.');
      setForm(prev => ({ ...prev, status: 'error' }));
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      phone: '',
      address: '',
      needs: '',
      date: '',
      status: 'idle'
    });
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-8 flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors font-black uppercase tracking-widest text-xs group"
          >
            <i className="fa-solid fa-arrow-left-long group-hover:-translate-x-2 transition-transform"></i>
            <span>Back to Home</span>
          </button>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full mb-6">
              <i className="fa-solid fa-calendar-check text-emerald-600 dark:text-emerald-400 text-xs"></i>
              <span className="text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-[10px]">Priority Access</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight uppercase leading-[0.95]">
              Book Your <br />
              <span className="text-emerald-600">Specialist</span> Slot
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium leading-relaxed max-w-lg">
              Secure your professional health consultation with Abuja's leading pharmaceutical team. 
            </p>
            <div className="space-y-8">
              {[
                { icon: 'fa-clock', title: 'Zero Wait Time', desc: 'Pre-booked slots ensure you are seen immediately.' },
                { icon: 'fa-user-doctor', title: 'Senior Pharmacists', desc: 'Handled by our most experienced clinical staff.' },
                { icon: 'fa-truck-fast', title: 'Home Services', desc: 'Include your address for seamless medication delivery.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-5 group">
                  <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-600 shadow-xl shrink-0 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110">
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight mb-1">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full"></div>
            <div className="relative bg-white dark:bg-slate-900 p-8 md:p-14 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 transition-all animate-fade-up">
              {form.status === 'success' ? (
                <div className="animate-fade-in text-center py-8">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                    <i className="fa-solid fa-check text-4xl"></i>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">Slot Reserved</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">We have received your booking details and will contact you to confirm.</p>
                  <button 
                    onClick={handleReset}
                    className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm active:scale-95 transition-all"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Book appointment</h3>
                    <p className="text-slate-500 font-medium text-sm">Priority slots are available Monday - Saturday.</p>
                  </div>

                  {form.status === 'error' && errorMessage && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-2xl text-sm font-bold border border-amber-100 dark:border-amber-900/30">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={form.name}
                        onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-bold"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={form.phone}
                        onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-bold"
                        placeholder="0803 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Residential Address</label>
                    <input 
                      type="text" 
                      value={form.address}
                      onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-bold"
                      placeholder="Street name, Area, Abuja"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Describe your needs</label>
                    <textarea 
                      rows={2}
                      value={form.needs}
                      onChange={e => setForm(prev => ({ ...prev, needs: e.target.value }))}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-bold resize-none"
                      placeholder="e.g. Consultation, Blood pressure check..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Preferred Date</label>
                    <input 
                      type="date" 
                      value={form.date}
                      onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-bold"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={form.status === 'submitting'}
                    className="w-full bg-emerald-600 text-white font-black py-6 rounded-3xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/20 disabled:opacity-50 uppercase tracking-[0.3em] text-sm active:scale-95 group"
                  >
                    {form.status === 'submitting' ? (
                      <span className="flex items-center justify-center">
                        <i className="fa-solid fa-spinner animate-spin mr-3"></i>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-3">
                        <span>Book appointment</span>
                        <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
