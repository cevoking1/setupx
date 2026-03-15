'use client';
import React from 'react';
import Link from 'next/link';
import { Wrench, ShieldCheck, RefreshCcw, Zap, ChevronRight, ShoppingCart, User } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: "Профессиональная чистка",
      desc: "Полный разбор, замена термопасты (Thermal Grizzly) и удаление пыли.",
      price: "15 000 ₸",
      icon: <Zap className="text-brand" size={32} />
    },
    {
      title: "Trade-In",
      desc: "Принеси старое железо и получи скидку до 70% на новое оборудование.",
      price: "Оценка 0 ₸",
      icon: <RefreshCcw className="text-brand" size={32} />
    },
    {
      title: "Кастомная сборка",
      desc: "Индивидуальный проект с кастомным СВО и моддингом кабелей.",
      price: "от 50 000 ₸",
      icon: <Wrench className="text-brand" size={32} />
    },
    {
      title: "Гарантия SetupX",
      desc: "Расширенное обслуживание вашего ПК на 3 года с выездом мастера.",
      price: "30 000 ₸",
      icon: <ShieldCheck className="text-brand" size={32} />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white antialiased">
      {/* HEADER (тот же, что и везде) */}
      <header className="h-[75px] border-b border-border bg-background/95 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto h-full px-8 flex justify-between items-center">
          <Link href="/"><img src="/logo.png" className="h-7 w-auto" /></Link>
          <nav className="hidden xl:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            <Link href="/catalog" className="hover:text-white">Комплектующие</Link>
            <Link href="/configurator" className="hover:text-white">Конфигуратор</Link>
            <Link href="/services" className="text-white">Услуги</Link>
          </nav>
          <div className="flex gap-6 text-white/60"><ShoppingCart size={20}/><User size={20}/></div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-8 py-20">
        <div className="text-center space-y-4 mb-20">
          <h1 className="text-5xl font-black uppercase tracking-tighter">Сервис & Услуги</h1>
          <p className="text-white/20 uppercase tracking-[0.3em] text-xs font-bold">Поддержка вашей системы на высшем уровне</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-surface border border-border p-10 rounded-premium group hover:border-brand transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold italic uppercase">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-[300px]">{s.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xl font-black text-brand">{s.price}</span>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
                    Оставить заявку <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}