export default function Footer() {
  return (
    <footer className="w-full bg-[#3a3a3a] text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-6">
        <div className="flex gap-8 text-base font-medium">
          <a href="#news" className="hover:text-green-400 transition-all duration-200">News</a>
          <a href="#deals" className="hover:text-green-400 transition-all duration-200">Deals</a>
          <a href="#blog" className="hover:text-green-400 transition-all duration-200">Blog</a>
        </div>
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Universal Poker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
