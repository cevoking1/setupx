import { ShoppingBag, Search, Globe } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black border-b border-[#1A1A1A]">
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold tracking-[0.1em] uppercase">
            Setup<span className="text-neon">X</span>
          </span>
          <span className="text-[9px] text-[#444] font-mono ml-2 border-l border-[#222] pl-2 uppercase tracking-widest">
            Almaty / KZ
          </span>
        </div>

        {/* Навигация на русском */}
        <nav className="hidden lg:flex items-center gap-10 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#666]">
          <a href="#" className="hover:text-white transition-colors">Комплектующие</a>
          <a href="#" className="hover:text-white transition-colors">Периферия</a>
          <a href="#" className="hover:text-white transition-colors">Сборки</a>
          <a href="#" className="hover:text-white transition-colors">Сервис</a>
        </nav>

        {/* Акции и Корзина */}
        <div className="flex items-center gap-8">
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#666]">
            <Globe size={14} />
            <span>KZ / RU</span>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <ShoppingBag size={18} className="text-[#666] group-hover:text-white transition-colors" />
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Корзина [0]</span>
          </div>
        </div>

      </div>
    </header>
  );
};