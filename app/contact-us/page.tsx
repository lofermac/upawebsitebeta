"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Send, MessageCircle } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form logic will be implemented later
    console.log(formData);
  };

  // Contact methods data
  const contactMethods = [
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: 'WhatsApp',
      color: 'from-[#25D366] to-[#128C7E]',
      hoverColor: 'group-hover/method:shadow-[#25D366]/40',
      link: 'https://wa.me/yourwhatsappnumber'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      label: 'Discord',
      color: 'from-[#5865F2] to-[#4752C4]',
      hoverColor: 'group-hover/method:shadow-[#5865F2]/40',
      link: 'https://discord.gg/yourdiscord'
    },
    {
      icon: <Send className="h-6 w-6" strokeWidth={2} />,
      label: 'Telegram',
      color: 'from-[#0088cc] to-[#006699]',
      hoverColor: 'group-hover/method:shadow-[#0088cc]/40',
      link: 'https://t.me/yourtelegram'
    }
  ];

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <Header />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-[#1E1E1E] w-full pt-32 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            
            {/* Left Column - Contact Methods */}
            <div className="space-y-8 animate-fade-up-delay-400">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6"
                    style={{ 
                      textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                      letterSpacing: '-0.01em'
                    }}>
                  Quick Contact
                </h2>
                <p className="text-base text-gray-400 mb-8 leading-relaxed">
                  Connect with us instantly through your favorite platform. Our team is ready to assist you with any questions or concerns.
                </p>
              </div>

              {/* Contact Method Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/method relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1`}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-10 group-hover/method:opacity-20 transition-all duration-500`}></div>
                    
                    {/* Border */}
                    <div className={`relative border border-white/[0.08] rounded-2xl p-5 bg-black/40 backdrop-blur-sm shadow-xl ${method.hoverColor} transition-all duration-500`}>
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3 shadow-lg transition-all duration-500 group-hover/method:scale-110`}>
                        <div className="text-white">
                          {method.icon}
                        </div>
                      </div>
                      
                      {/* Label */}
                      <h3 className="text-base font-semibold text-white">{method.label}</h3>
                      
                      {/* Hover arrow */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover/method:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/method:translate-x-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Additional Info Card */}
              <div className="relative rounded-2xl overflow-hidden mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/10 to-emerald-500/5"></div>
                <div className="relative border border-[#077124]/20 rounded-2xl p-6 bg-black/40 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#077124]/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-[#077124]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-2">Need immediate assistance?</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Our support team typically responds within 24 hours. For urgent matters, please reach out via WhatsApp or Discord.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="animate-fade-up-delay-800">
              <div className="relative group/form">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem] transition-all duration-700"></div>
                <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
                
                {/* Ambient glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
                
                {/* Content */}
                <div className="relative z-10 p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2"
                      style={{ 
                        textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                        letterSpacing: '-0.01em'
                      }}>
                    Send Us An Email
                  </h2>
                  <p className="text-sm text-gray-400 mb-6">
                    Fill out the form and we&apos;ll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Name <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="relative w-full px-4 py-3 bg-black/40 border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="Doyle Brunson"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Email <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="relative w-full px-4 py-3 bg-black/40 border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="email@example.com"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Message <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="relative w-full px-4 py-3 bg-black/40 border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50 resize-none"
                          placeholder="Tell us what's wrong. If this is concerning a specific site, please let us know which one and your username."
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        className="group relative inline-flex items-center justify-center gap-2 px-10 py-3.5 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
                        style={{
                          boxShadow: `
                            0 0 0 1px rgba(255,255,255,0.1),
                            0 1px 3px 0 rgba(0,0,0,0.5),
                            0 4px 12px rgba(7,113,36,0.3),
                            0 8px 32px rgba(7,113,36,0.25),
                            0 16px 64px rgba(7,113,36,0.2),
                            inset 0 1px 1px rgba(255,255,255,0.3),
                            inset 0 -1px 1px rgba(0,0,0,0.2)
                          `
                        }}
                      >
                        {/* Glow layers */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                        <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        {/* Glass reflection */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                        
                        {/* Inner shadow */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                        
                        {/* Button content */}
                        <span className="relative z-10 tracking-wide drop-shadow-lg">Send Message</span>
                        <Send className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" strokeWidth={3} />
                        
                        {/* Edge highlights */}
                        <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                        <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.8s ease-out;
        }
        
        .animate-fade-up-delay-400 {
          animation: fade-up 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-up-delay-800 {
          animation: fade-up 0.8s ease-out 0.4s both;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

