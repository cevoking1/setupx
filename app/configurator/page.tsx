'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Cpu, BarChart3, HardDrive, Database, Zap, Box, CheckCircle2, ChevronRight, ShoppingCart } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ConfiguratorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [build, setBuild] = useState<any>({
    cpu: null,
    gpu: null,
    mb: null,
    ram: null,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 'cpu', name: 'Процессор', icon: <Cpu size={18} /> },
    { id: 'mb', name: 'Материнская плата', icon: <HardDrive size={18} /> },
    { id: 'gpu', name: 'Видеокарта', icon: <BarChart3 size={18} /> },
    { id: 'ram', name: 'Оперативная память', icon: <Database size={18} /> },
  ];

  // Загрузка товаров для текущего шага
  useEffect(() => {
    async function fetchStepProducts() {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', steps[currentStep].id);
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchStepProducts();
  }, [currentStep]);

  const totalPrice = Object.values(build).reduce((sum: number, item: any) => sum + (item?.price || 0), 0);

  return (
    <div className="min-h-screen bg-background text-[#F5F5F5] antialiased">
      {/* HEADER */}
      <header className="h-[75px] border-b border-border bg-background/95 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto h-full px-8 flex justify-between items-center">
          <Link href="/"><img src="/logo.png" className="h-7 w-auto" /></Link>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 italic">System Builder v1.0</div>
          <div className="flex items-center gap-4 text-brand font-black text-xl">
             {totalPrice.toLocaleString()} ₸
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ЛЕВАЯ ЧАСТЬ: ШАГИ */}
        <div className="lg:col-span-3 space-y-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                currentStep === index ? 'border-brand bg-brand/5' : 'border-border opacity-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={currentStep === index ? 'text-brand' : 'text-white'}>{step.icon}</div>
                <div className="text-[11px] font-bold uppercase tracking-widest">{step.name}</div>
              </div>
              {build[step.id] && <CheckCircle2 size={16} className="text-brand" />}
            </div>
          ))}
        </div>

        {/* ЦЕНТРАЛЬНАЯ ЧАСТЬ: ВЫБОР ДЕТАЛЕЙ */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-black uppercase tracking-tight">Выберите {steps[currentStep].name}</h2>
             <span className="text-[10px] font-mono text-white/20">Шаг {currentStep + 1} из {steps.length}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="py-20 text-center animate-pulse text-white/10 uppercase text-xs tracking-widest">Анализ склада...</div>
            ) : products.map(product => (
              <div 
                key={product.id}
                onClick={() => setBuild({...build, [steps[currentStep].id]: product})}
                className={`p-6 rounded-premium border cursor-pointer transition-all flex items-center justify-between group ${
                  build[steps[currentStep].id]?.id === product.id ? 'border-brand bg-brand/10' : 'border-border hover:border-brand/40'
                }`}
              >
                <div>
                  <div className="text-brand font-mono text-[9px] uppercase tracking-widest mb-1">{product.brand}</div>
                  <div className="font-bold text-lg">{product.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-xl mb-2">{product.price.toLocaleString()} ₸</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest transition-opacity ${build[steps[currentStep].id]?.id === product.id ? 'opacity-100 text-brand' : 'opacity-0'}`}>Выбрано</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: ИТОГО */}
        <div className="lg:col-span-3">
          <div className="sticky top-32 p-8 bg-surface border border-border rounded-premium space-y-8 brand-glow">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/5 pb-4 text-white/40">Ваша сборка</h3>
            <div className="space-y-4">
               {steps.map(s => (
                 <div key={s.id} className="text-[11px] flex justify-between">
                   <span className="text-white/20 uppercase">{s.name}:</span>
                   <span className="text-white font-bold truncate ml-4">{build[s.id]?.name || '—'}</span>
                 </div>
               ))}
            </div>
            <div className="pt-8 border-t border-white/5 space-y-6">
               <div className="flex justify-between items-end">
                 <span className="text-[10px] uppercase text-white/40 font-bold">Итого</span>
                 <span className="text-2xl font-black">{totalPrice.toLocaleString()} ₸</span>
               </div>
               <button 
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="w-full py-4 bg-brand text-white rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:brightness-110 disabled:opacity-20 transition-all flex items-center justify-center gap-2"
               >
                 Следующий шаг <ChevronRight size={14} />
               </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}