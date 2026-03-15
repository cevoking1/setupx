'use client';

import React from 'react';
import { 
  BarChart3, ShoppingCart, User, ChevronRight, 
  MessageCircle, ShieldCheck, Zap, Activity 
} from 'lucide-react';

export default function ComputersPage() {
  const pcSeries = [
    {
      name: "SetupX Base",
      tag: "Для старта",
      price: "от 450 000 ₸",
      desc: "Идеальное решение для FullHD гейминга и повседневных задач.",
      image: "BASE_PC",
      specs: ["RTX 4060", "Core i5-13400", "16GB RAM"]
    },
    {
      name: "SetupX Pro",
      tag: "Золотой стандарт",
      price: "от 850 000 ₸",
      desc: "Создан для 2K гейминга на ультра-настройках и работы с графикой.",
      image: "PRO_PC",
      specs: ["RTX 4070 Ti Super", "Core i7-14700K", "32GB RAM"]
    },
    {
      name: "SetupX Ultimate",
      tag: "Бескомпромиссный",
      price: "от 1 800 000 ₸",
      desc: "Максимальная производительность в 4K. Кастомное охлаждение и ручная сборка.",
      image: "ULTIMATE_PC",
      specs: ["RTX 4090", "Core i9-14900KS", "64GB RAM"]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-[#F5F5F5] antialiased">
      
      {/* HEADER (Центрированный, как мы договаривались) */}
      <header className="h-[75px] border-b border-border bg-background/95 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto h-full px-8 grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <a href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="SetupX Logo" className="h-7 w-auto" />
            </a>
          </div>
          <nav className="hidden xl:flex items-center justify-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">
            <a href="/computers" className="text-white">Компьютеры</a>
            <a href="/catalog" className="hover:text-white transition-colors">Комплектующие</a>
            <a href="/configurator" className="hover:text-white transition-colors">Конфигуратор</a>
            <a href="/services" className="hover:text-white transition-colors">Услуги</a>
          </nav>
          <div className="flex items-center justify-end gap-8 text-white/60">
            <BarChart3 size={20} className="hover:text-brand cursor-pointer" />
            <div className="relative group cursor-pointer">
               <ShoppingCart size={20} className="group-hover:text-brand transition-colors" />
               <span className="absolute -top-2 -right-2 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <User size={20} className="hover:text-brand cursor-pointer transition-colors" />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 py-16 space-y-24">
        
        {/* Заголовок страницы */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Игровые системы <span className="text-brand">SetupX</span></h1>
          <p className="text-white/30 text-sm tracking-widest uppercase">Выбери свою мощь • Алматы, Казахстан</p>
        </div>

        {/* Сетка серий ПК */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pcSeries.map((pc, i) => (
            <div key={i} className="bg-surface border border-border rounded-premium p-10 flex flex-col group hover:border-brand/40 transition-all duration-500 brand-glow">
              <span className="text-brand font-mono text-[10px] tracking-[0.3em] uppercase mb-4">{pc.tag}</span>
              <h2 className="text-3xl font-bold uppercase tracking-tight mb-4">{pc.name}</h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 h-12">{pc.desc}</p>
              
              <div className="aspect-square bg-[#121212] rounded-2xl mb-8 flex items-center justify-center border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-white/5 font-black text-6xl uppercase tracking-tighter rotate-12">{pc.image}</span>
              </div>

              <div className="space-y-3 mb-10">
                {pc.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[12px] font-bold text-white/60 uppercase tracking-wider">
                    <Activity size={14} className="text-brand" />
                    {spec}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-xl font-black">{pc.price}</span>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-brand hover:text-white transition-all active:scale-95">
                  Выбрать <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Информационный блок */}
        <div className="bg-[#0A0A0A] border border-border rounded-premium p-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
                <h3 className="text-2xl font-bold uppercase tracking-tight">Нужен индивидуальный проект?</h3>
                <p className="text-white/40 text-[14px] max-w-xl">
                    Наши инженеры готовы реализовать любую идею: от уникальной покраски корпуса до сложнейших систем водяного охлаждения.
                </p>
            </div>
            <button className="whitespace-nowrap px-10 py-4 border border-brand text-brand rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-brand hover:text-white transition-all">
                Связаться с мастером
            </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">© 2026 SetupX Kazakhstan. Мастерская игровых решений.</p>
      </footer>

      {/* FAB */}
      <div className="fixed bottom-10 right-10 w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 cursor-pointer hover:scale-110 transition-transform z-50">
        <MessageCircle size={30} className="text-white" />
      </div>

    </div>
  );
}