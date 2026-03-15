'use client';
import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, ShoppingCart, User, MessageCircle,
  Cpu, Monitor, MousePointer2, HardDrive, Disc, Zap 
} from 'lucide-react';

export default function CatalogLanding() {
  const categories = [
    { id: 'gpu', name: "Видеокарты", icon: <BarChart3 size={40} /> },
    { id: 'cpu', name: "Процессоры", icon: <Cpu size={40} /> },
    { id: 'mb', name: "Материнские платы", icon: <HardDrive size={40} /> },
    { id: 'ram', name: "Оперативная память", icon: <Disc size={40} /> },
    { id: 'ssd', name: "Накопители", icon: <Disc size={40} /> },
    { id: 'psu', name: "Блоки питания", icon: <Zap size={40} /> },
  ];

  return (
    <div className="min-h-screen bg-background text-[#F5F5F5] antialiased">
      {/* HEADER */}
      <header className="h-[75px] border-b border-border bg-background/95 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto h-full px-8 grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="SetupX Logo" className="h-7 w-auto" />
            </Link>
          </div>
          <nav className="hidden xl:flex items-center justify-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">
            <Link href="/computers" className="hover:text-white transition-colors">Компьютеры</Link>
            <Link href="/catalog" className="text-white">Комплектующие</Link>
            <Link href="/configurator" className="hover:text-white transition-colors">Конфигуратор</Link>
            <Link href="/services" className="hover:text-white transition-colors">Услуги</Link>
          </nav>
          <div className="flex items-center justify-end gap-8 text-white/60">
            <div className="relative cursor-pointer"><ShoppingCart size={20} /><span className="absolute -top-2 -right-2 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span></div>
            <User size={20} />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-20">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-center">Каталог комплектующих</h1>
        <p className="text-center text-white/20 text-sm mb-16 uppercase tracking-[0.3em]">Выберите категорию для поиска</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link href={`/catalog/${cat.id}`} key={cat.id} className="group bg-surface border border-border rounded-premium p-12 flex flex-col items-center gap-6 hover:border-brand transition-all duration-500 brand-glow">
              <div className="text-white/20 group-hover:text-brand transition-colors">{cat.icon}</div>
              <span className="text-xl font-bold uppercase tracking-widest group-hover:text-white">{cat.name}</span>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 mt-20">
        <div className="max-w-[1600px] mx-auto px-8 text-center">
          <img src="/logo.png" alt="Logo" className="h-6 w-auto mx-auto mb-6 opacity-20" />
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">© 2026 SetupX Kazakhstan.</p>
        </div>
      </footer>
    </div>
  );
}