'use client';
import React, { useState, useEffect, use } from 'react'; // Добавили "use"
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Search, Plus, SlidersHorizontal, ChevronLeft, ShoppingCart, User } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Указываем тип Promise для пропсов
interface PageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage(props: PageProps) {
  // 1. Распаковываем params с помощью React.use()
  const params = use(props.params);
  const category = params.category;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category); // Используем распакованный category

      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-[#F5F5F5] antialiased">
      {/* HEADER */}
      <header className="h-[75px] border-b border-border bg-background/95 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto h-full px-8 grid grid-cols-3 items-center">
          <div className="flex justify-start"><Link href="/"><img src="/logo.png" className="h-7 w-auto" /></Link></div>
          <nav className="hidden xl:flex items-center justify-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">
            <Link href="/computers" className="hover:text-white">Компьютеры</Link>
            <Link href="/catalog" className="text-white">Комплектующие</Link>
            <Link href="/configurator" className="hover:text-white">Конфигуратор</Link>
            <Link href="/services" className="hover:text-white">Услуги</Link>
          </nav>
          <div className="flex items-center justify-end gap-8 text-white/60"><ShoppingCart size={20} /><User size={20} /></div>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-[75px] z-40">
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center gap-10">
          <Link href="/catalog" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest shrink-0">
            <ChevronLeft size={16} /> Назад
          </Link>
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder={`Поиск в ${category.toUpperCase()}...`} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-full py-3.5 pl-14 pr-6 text-sm outline-none focus:border-brand/40"
            />
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-72 shrink-0">
           <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand flex items-center gap-3">
            <SlidersHorizontal size={14} /> Фильтры / {category.toUpperCase()}
          </h3>
        </aside>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
             <div className="col-span-full py-20 text-center animate-pulse text-white/10 uppercase tracking-widest text-xs">Подключение к базе SetupX...</div>
          ) : filteredProducts.map((product) => (
            <div key={product.id} className="bg-surface border border-border rounded-premium p-7 group hover:border-brand/40 transition-all duration-500">
              <div className="aspect-[4/3] bg-[#121212] rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <span className="text-white/5 font-black text-4xl uppercase italic">{product.category}</span>
              </div>
              <div className="space-y-2 mb-8">
                <span className="text-[9px] font-bold text-brand uppercase tracking-[0.3em]">{product.brand}</span>
                <h3 className="text-base font-bold text-white/90 leading-tight group-hover:text-white">{product.name}</h3>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-xl font-black">{product.price.toLocaleString()} ₸</span>
                <button className="w-11 h-11 bg-white text-black rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                  <Plus size={22} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}