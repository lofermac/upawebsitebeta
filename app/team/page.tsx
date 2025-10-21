import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Our Team - Universal Poker',
  description: 'Welcome to the heart of our operation, where passion for poker and dedication to help grow our wonderful community come together to create an extraordinary team.',
};

// Team Members Data
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
    name: 'Paul',
    position: 'Finance Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'My name is Paul, the Finance Manager at Universal Poker. I have been with Universal since day one, bringing a wealth of experience in Poker, Banking and Finance industries.',
  },
  {
    id: 5,
    name: 'Tim',
    position: 'Operations Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'I\'m Tim, the Operations Manager at Universal Poker. I have always been in the poker scene, with the vast majority of my time spent as the Poker Manager at Ladbrokes.',
  },
  {
    id: 6,
    name: 'Stephen',
    position: 'Affiliate Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'Hello, I\'m Stephen! I\'m one of the Affiliate Managers at Universal Poker. I\'m currently looking after UK and Ireland based players within our network!',
  },
  {
    id: 7,
    name: 'Jacob',
    position: 'Support Manager',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'I\'m Jacob, the Support Manager at Universal Poker. I oversee our support channels, ensuring that player queries are addressed promptly and efficiently.',
  },
  {
    id: 8,
    name: 'Peter',
    position: 'Digital Marketing',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'Hi, I\'m Peter, the Digital Marketing expert! I specialise in Universal Poker\'s online footprint, primarily specialising in SEO.',
  },
  {
    id: 9,
    name: 'Leonardo',
    position: 'Data Analyst',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144030/jhfhfjhfhfhgfhgfhgfjhv-1-e1698778319516-1024x1024.png',
    description: 'I\'m Leonardo, one of the Data Analysts at Universal Poker. My role inside the company is to provide the best insights for the staff to make the best decisions.',
  },
];

export default function TeamPage() {
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
            <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 animate-fade-up" 
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em'
                }}>
              Meet Our Team
            </h1>
            
            {/* Description */}
            <p className="text-gray-400 text-center text-lg md:text-xl lg:text-[1.35rem] max-w-5xl mx-auto leading-relaxed font-normal animate-fade-up"
               style={{ 
                 textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                 letterSpacing: '-0.01em',
                 animationDelay: '0.2s'
               }}>
              Welcome to the heart of our operation, where passion for poker and dedication to help grow our wonderful community come together to create an extraordinary team.
            </p>

            {/* Call to Action */}
            <p className="text-gray-400 text-center text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-normal mt-4 animate-fade-up"
               style={{ 
                 textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                 letterSpacing: '-0.01em',
                 animationDelay: '0.4s'
               }}>
              Do you think you could be a good fit for Universal Poker?
              <br />
              <Link 
                href="/contact-us" 
                className="text-[#077124] hover:text-emerald-400 font-semibold transition-colors duration-300"
              >
                Contact Us
              </Link>
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

      <Footer />
    </div>
  );
}

