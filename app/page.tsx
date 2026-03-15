'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, ShoppingCart, User, ChevronRight, MessageCircle,
  Cpu, Monitor, MousePointer2, HardDrive, ShieldCheck, 
  Truck, Zap, Plus, Minus
} from 'lucide-react';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { name: "Процессоры", icon: <Cpu size={32} />, href: "/catalog" },
    { name: "Видеокарты", icon: <BarChart3 size={32} />, href: "/catalog" },
    { name: "Материнские платы", icon: <HardDrive size={32} />, href: "/catalog" },
    { name: "Мониторы", icon: <Monitor size={32} />, href: "/catalog" },
    { name: "Периферия", icon: <MousePointer2 size={32} />, href: "/catalog" },
    { name: "Охлаждение", icon: <Cpu size={32} />, href: "/catalog" },
  ];

  const faqData = [
    { q: "Есть ли рассрочка или Kaspi Red?", a: "Да, мы поддерживаем Kaspi QR, Red и рассрочку 0-0-12 на все товары магазина." },
    { q: "Как работает гарантия?", a: "В случае неисправности мы забираем устройство курьером и проводим диагностику за 24 часа." },
    { q: "Сборка входит в стоимость комплектующих?", a: "При покупке полного набора комплектующих сборка — бесплатно." }
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
            <Link href="/catalog" className="hover:text-white transition-colors">Комплектующие</Link>
            <Link href="/configurator" className="hover:text-white transition-colors">Конфигуратор</Link>
            <Link href="/services" className="hover:text-white transition-colors">Услуги</Link>
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

      <main className="max-w-[1600px] mx-auto px-8 py-12 space-y-32">
        
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 relative h-[500px] rounded-premium overflow-hidden bg-surface border border-border group brand-glow">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 via-transparent to-transparent" />
            <div className="relative z-10 h-full p-16 flex flex-col justify-end items-start">
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                Cоздай свой <br/> <span className="text-brand">Setup</span> мечты
              </h1>
              <Link href="/configurator" className="px-10 py-4 bg-brand text-white rounded-full font-bold text-[12px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-brand/20">
                Перейти в конфигуратор
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 rounded-premium bg-surface border border-border p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 text-white">SetupX Workshop</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Премиальное обслуживание и подбор компонентов от экспертов.
              </p>
              <Link href="/services" className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-widest group">
                Подробнее <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
        </section>

        {/* CATALOG GRID */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black tracking-tight uppercase border-l-4 border-brand pl-6">Каталог комплектующих</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {categories.map((cat, i) => (
              <Link href={cat.href} key={i} className="group cursor-pointer bg-surface border border-border rounded-premium p-10 flex flex-col items-center text-center hover:border-brand/50 hover:bg-[#1f1f1f] transition-all duration-500">
                <div className="text-white/20 group-hover:text-brand group-hover:scale-110 transition-all mb-6">
                  {cat.icon}
                </div>
                <h3 className="text-[13px] font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto space-y-12 pb-20">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Вопросы и ответы</h2>
          </div>
          <div className="space-y-4">
            {faqData.map((item, i) => (
              <div 
                key={i} 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`bg-surface border transition-colors duration-200 rounded-2xl p-6 cursor-pointer ${openFaq === i ? 'border-brand' : 'border-border'}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-bold text-sm uppercase tracking-wide ${openFaq === i ? 'text-brand' : 'text-white'}`}>{item.q}</span>
                  {openFaq === i ? <Minus size={18} className="text-brand" /> : <Plus size={18} className="text-brand" />}
                </div>
                {openFaq === i && (
                  <div className="mt-6 opacity-100 transition-opacity duration-300">
                    <p className="text-white/50 text-[14px] leading-relaxed border-t border-white/5 pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-[#0A0A0A] border-t border-border pt-20 pb-10">
        <div className="max-w-[1600px] mx-auto px-8 text-center">
            <img src="/logo.png" alt="Logo" className="h-6 w-auto mx-auto mb-6 opacity-20" />
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">© 2026 SetupX Kazakhstan.</p>
        </div>
      </footer>

      <div className="fixed bottom-10 right-10 w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 cursor-pointer hover:scale-110 transition-transform active:scale-90 z-50">
        <MessageCircle size={30} className="text-white" />
      </div>

    </div>
  );
}