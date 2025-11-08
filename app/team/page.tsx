"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import { Send } from "lucide-react";
import { getTeamMembers, type TeamMember } from "@/lib/supabase/team";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Load team members from Supabase
  useEffect(() => {
    async function loadTeam() {
      try {
        const { data, error } = await getTeamMembers();
        if (error) {
          console.error('Error loading team members:', error);
        } else if (data) {
          setTeamMembers(data);
        }
      } catch (error) {
        console.error('Failed to load team:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTeam();
  }, []);

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
            <HeaderWithAuth />
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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={`skeleton-${index}`}
                  className="rounded-2xl overflow-hidden backdrop-blur-xl h-full animate-pulse"
                >
                  <div className="bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col h-full">
                    <div className="w-full aspect-square bg-gray-800"></div>
                    <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-grow">
                      <div className="h-6 bg-gray-800 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-32 mb-3"></div>
                      <div className="h-16 bg-gray-800 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : teamMembers.length === 0 ? (
              // No members found
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">No team members found</p>
              </div>
            ) : (
              // Team members
              teamMembers.map((member, index) => (
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
                      {member.photo_url ? (
                        <Image
                          src={member.photo_url}
                          alt={`${member.name} - ${member.role}`}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <Image
                            src="/images/logo.png"
                            alt="Universal Poker"
                            width={150}
                            height={150}
                            className="opacity-20"
                            loading="lazy"
                          />
                        </div>
                      )}
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
                        {member.role}
                      </p>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed"
                         style={{ 
                           textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                           letterSpacing: '-0.005em'
                         }}>
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
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

                  {/* Submit Button - Mesmo estilo dos CTAs da Homepage */}
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="relative font-semibold text-sm px-6 py-3.5 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/btn overflow-hidden inline-flex items-center gap-2"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Send Enquiry
                        <Send className="w-4 h-4 transition-all duration-300" strokeWidth={2.5} />
                      </span>
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
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

