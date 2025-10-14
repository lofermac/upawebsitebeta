'use client'

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Globe, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Lista de países (exemplo - pode expandir)
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
  "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
  "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
  "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe"
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    password: '',
    confirmPassword: '',
    discordId: '',
    whatsapp: '',
    telegram: '',
    agreeTerms: false,
    agreePrivacy: false,
    receivePromotions: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic will be implemented later
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with same positioning as home */}
      <div className="w-full pt-4 md:pt-6 px-3 md:px-4">
        <Header />
      </div>

      {/* Main Content - Registration Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-5xl">
          {/* Registration Card */}
          <div className="relative group">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-3xl transition-all duration-700 group-hover:from-[#0e0e0e] group-hover:via-[#131313] group-hover:to-[#0e0e0e]"></div>
            
            {/* Border effect */}
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08] shadow-2xl shadow-black/50 transition-all duration-700 group-hover:border-white/[0.12] group-hover:shadow-black/60 pointer-events-none"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-700 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"></div>
            
            {/* Top light rim */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent rounded-t-3xl"></div>
            
            {/* Ambient glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#077124]/[0.06] rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/[0.04] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              {/* Title */}
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Register
                </h1>
                <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
                  Please register for a Universal Poker account. You can then start earning cash back through our industry leading deals and referral program.
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Account Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="p-2 rounded-lg bg-[#077124]/10 border border-[#077124]/20">
                      <User className="h-5 w-5 text-[#077124]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Account Details</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group/input">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group/input">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-300">
                        Country <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                        </div>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] appearance-none cursor-pointer"
                          required
                        >
                          <option value="" className="bg-[#121212]">Choose a Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country} className="bg-[#121212]">
                              {country}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        E-mail <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="Create a strong password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                        Confirm Password <span className="text-red-400">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="p-2 rounded-lg bg-[#077124]/10 border border-[#077124]/20">
                      <MessageCircle className="h-5 w-5 text-[#077124]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                      <p className="text-sm text-gray-400 mt-1">
                        This information helps us get in touch so we can provide you with support on our affiliate deals.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Discord ID */}
                    <div className="space-y-2">
                      <label htmlFor="discordId" className="block text-sm font-medium text-gray-300">
                        Discord ID
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="discordId"
                          name="discordId"
                          value={formData.discordId}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="username#1234"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300">
                        WhatsApp
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    {/* Telegram */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="telegram" className="block text-sm font-medium text-gray-300">
                        Telegram
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Send className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="telegram"
                          name="telegram"
                          value={formData.telegram}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 pt-6 border-t border-white/[0.06]">
                  <label className="flex items-start cursor-pointer group/checkbox">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/[0.08] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/20 focus:ring-offset-0 transition-all duration-300 cursor-pointer"
                      required
                    />
                    <span className="ml-3 text-sm text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300">
                      I agree to the{' '}
                      <a href="#terms" className="text-[#077124] hover:text-[#088a2d] font-medium transition-colors duration-300">
                        Universal Poker Terms & Conditions
                      </a>
                      .
                    </span>
                  </label>

                  <label className="flex items-start cursor-pointer group/checkbox">
                    <input
                      type="checkbox"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/[0.08] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/20 focus:ring-offset-0 transition-all duration-300 cursor-pointer"
                      required
                    />
                    <span className="ml-3 text-sm text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300">
                      I agree to the{' '}
                      <a href="#privacy" className="text-[#077124] hover:text-[#088a2d] font-medium transition-colors duration-300">
                        Universal Poker Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  <label className="flex items-start cursor-pointer group/checkbox">
                    <input
                      type="checkbox"
                      name="receivePromotions"
                      checked={formData.receivePromotions}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-white/[0.08] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/20 focus:ring-offset-0 transition-all duration-300 cursor-pointer"
                    />
                    <span className="ml-3 text-sm text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300">
                      Get contacted about our latest deals and promotions!
                    </span>
                  </label>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="w-full relative font-bold text-lg px-6 py-4 rounded-xl bg-gradient-to-r from-[#077124] to-[#088a2d] text-white shadow-2xl shadow-[#077124]/40 hover:shadow-[#077124]/60 hover:scale-[1.02] transition-all duration-300 group/submit overflow-hidden mt-8"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    REGISTER
                    <svg className="w-0 group-hover/submit:w-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300"></div>
                  {/* Pulsing glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-[#077124]/20 blur-xl scale-0 group-hover/submit:scale-110 transition-transform duration-500"></div>
                </button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-400">
                    Already have an account? Please{' '}
                    <Link
                      href="/login"
                      className="font-semibold text-[#077124] hover:text-[#088a2d] transition-colors duration-300 hover:underline"
                    >
                      Login
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

