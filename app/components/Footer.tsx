export default function Footer() {
  return (
    <footer className="relative bg-black w-full px-3 md:px-4 pb-0">
      {/* Premium Container Card - Rounded top, cut bottom */}
      <div className="relative w-full rounded-t-[2.5rem] overflow-hidden group/footer transition-all duration-700">
        {/* Background with gradient - tom intermediário entre preto e cinza */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/footer:from-[#0e0e0e] group-hover/footer:via-[#131313] group-hover/footer:to-[#0e0e0e]"></div>
        
        {/* Subtle border effect - borda completa ao redor (exceto embaixo) */}
        <div className="absolute inset-x-0 top-0 bottom-0 left-0 right-0 rounded-t-[2.5rem] border-t border-l border-r border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/footer:border-white/[0.09] group-hover/footer:shadow-black/60 pointer-events-none"></div>
        
        {/* Inner glow effect - brilho interno sutil */}
        <div className="absolute inset-0 rounded-t-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/footer:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
        
        {/* Top light rim - brilho no topo */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
        
        {/* Ambient background effects - glows verdes sutis */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Subtle noise texture overlay for premium feel */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulance type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        
        {/* Content wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20">
        {/* Footer Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1 - Poker Sites */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Poker Sites</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="#partypoker" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  PartyPoker
                </a>
              </li>
              <li>
                <a href="#optibet" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Optibet
                </a>
              </li>
              <li>
                <a href="#betfair" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Betfair
                </a>
              </li>
              <li>
                <a href="#wpt" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  WPT Global
                </a>
              </li>
              <li>
                <a href="#ggpoker" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  GGPoker
                </a>
              </li>
              <li>
                <a href="#888poker" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  888Poker
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="#deals" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Deals
                </a>
              </li>
              <li>
                <a href="#news" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  News and Updates
                </a>
              </li>
              <li>
                <a href="#partners" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Partners
                </a>
              </li>
              <li>
                <a href="#contact" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Legal</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="/terms" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company Info (No Links) */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Contact Information</h3>
            <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <p className="font-semibold text-white mb-3">Universal Affiliates Limited</p>
              <p>Sutherland House</p>
              <p>1759 London Road</p>
              <p>Leigh on Sea</p>
              <p>Essex, SS9 2RZ</p>
              <p className="pt-2">Company Number 11667550</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="relative pt-8 border-t border-white/[0.05]">
          {/* Subtle gradient line on top of border */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 font-medium">
              <span className="text-white font-bold">UNIVERSALPOKER.COM</span> © {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Poker Deals</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>18+</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>T&Cs Apply</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
