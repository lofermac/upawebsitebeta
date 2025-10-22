"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Send } from "lucide-react";

// Team Members Data - In Order: Andy, Chris, Misha, Tim, Leonardo, Paul
const teamMembers = [
  {
    id: 1,
    name: 'Andy',
    position: 'Director',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'My name is Andy, and I\'m the owner and founder of Universal Poker. I was a professional poker player and very well known in the industry, mostly from playing televised poker.',
  },
  {
    id: 2,
    name: 'Chris',
    position: 'Associate Director',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144036/53221910069_4410e20b5a_o-e1698690291570-1024x1024.jpg',
    description: 'I\'m Chris, the Associate Director at Universal Poker. I have been in the poker industry for years now, still playing online whenever I have the free time.',
  },
  {
    id: 3,
    name: 'Misha',
    position: 'Affiliate Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144038/2023-10-30-17.49.16.jpg',
    description: 'Hi, I\'m Misha, one of the Affiliate Managers at Universal Poker. I have always been in the poker industry being a former professional poker pro and running my own stable.',
  },
  {
    id: 4,
    name: 'Tim',
    position: 'Operations Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'I\'m Tim, the Operations Manager at Universal Poker. I have always been in the poker scene, with the vast majority of my time spent as the Poker Manager at Ladbrokes.',
  },
  {
    id: 5,
    name: 'Leonardo',
    position: 'Data Analyst',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'I\'m Leonardo, one of the Data Analysts at Universal Poker. My role inside the company is to provide the best insights for the staff to make the best decisions.',
  },
  {
    id: 6,
    name: 'Paul',
    position: 'Finance Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'My name is Paul, the Finance Manager at Universal Poker. I have been with Universal since day one, bringing a wealth of experience in Poker, Banking and Finance industries.',
  },
];

export default function TeamPage() {
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

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* HEADER */}
      <section className="relative bg-black w-full flex flex-col items-center justify-start px-3 md:px-4 pt-6">
        <div className="relative w-full">
          <div className="relative z-50 px-4">
            <Header />
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="relative bg-black w-full py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Ambient glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#077124]/[0.08] rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
          
          <div className="relative z-10 text-center mb-20">
            {/* Title */}
            <h1 className="text-white text-center text-2xl md:text-3xl font-bold leading-tight mb-4 animate-fade-up" 
                style={{ 
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.01em'
                }}>
              Meet Our Team
            </h1>
            
            {/* Description */}
            <p className="text-gray-400 text-center text-base max-w-5xl mx-auto leading-relaxed font-normal animate-fade-up"
               style={{ 
                 textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                 letterSpacing: '-0.01em',
                 animationDelay: '0.2s'
               }}>
              Welcome to the heart of our operation, where passion for poker and dedication to help grow our wonderful community come together to create an extraordinary team.
            </p>
          </div>

          {/* TEAM GRID - 3x3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto auto-rows-fr">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-up h-full"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-[#077124]/20 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
                
                {/* Card Content */}
                <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/20 group-hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                  {/* Background subtle effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-4 sm:p-5 flex flex-col items-center text-center flex-grow z-10">
                    {/* Name */}
                    <h3 className="text-white text-base sm:text-lg font-bold mb-1 tracking-tight"
                        style={{ 
                          textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                          letterSpacing: '-0.01em',
                          fontWeight: '700'
                        }}>
                      {member.name}
                    </h3>
                    
                    {/* Position */}
                    <p className="text-[#077124] text-xs sm:text-sm font-semibold mb-3 tracking-wide">
                      {member.position}
                    </p>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed"
                       style={{ 
                         textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                         letterSpacing: '-0.005em'
                       }}>
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VACANCY SECTION WITH CONTACT FORM */}
      <section className="relative bg-black w-full py-20 px-4 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto">
          {/* Ambient glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#077124]/[0.06] rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4"
                  style={{ 
                    textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.01em'
                  }}>
                Join Our Team
              </h2>
              <p className="text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
                Think you could be a good fit for our team? Contact us and enquire about current opportunities.
              </p>
            </div>

            {/* Contact Form */}
            <div className="relative group/form max-w-2xl mx-auto">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem] transition-all duration-700"></div>
              <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
              
              {/* Ambient glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
              
              {/* Content */}
              <div className="relative z-10 p-6 md:p-8">
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
                        placeholder="Your name"
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
                        placeholder="Tell us about yourself and why you'd be a good fit for our team..."
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
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Send Enquiry</span>
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
      </section>

      <Footer />
    </div>
  );
}

