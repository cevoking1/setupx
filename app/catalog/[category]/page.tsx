'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useCart } from '@/context/CartContext';
import { Plus, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Разворачиваем параметры (нужно для стабильности Next.js)
  const categoryName = decodeURIComponent(params.category);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', categoryName);
        
        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Кнопка назад */}
        <Link href="/" className="flex items-center gap-2 text-white/30 hover:text-white mb-8 transition-colors text-[10px] font-bold uppercase tracking-widest">
          <ArrowLeft size={14} /> На главную
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">
            {categoryName} <span className="text-brand text-4xl not-italic">/</span> каталог
          </h1>
          <div className="h-1 w-20 bg-brand mt-4"></div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-brand" size={40} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Сканирование склада...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-surface border border-border p-6 rounded-premium hover:border-brand/50 transition-all group flex flex-col">
                <div className="aspect-square bg-white/5 rounded-2xl mb-6 flex items-center justify-center text-white/5 font-black text-4xl uppercase overflow-hidden relative">
                   {product.image_url ? (
                     <img src={product.image_url} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                   ) : (
                     "SetupX"
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="text-[9px] font-black text-brand uppercase tracking-[0.2em] mb-2">{product.brand || 'Premium'}</div>
                <h3 className="font-bold text-lg mb-6 leading-tight group-hover:text-brand transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/30 font-bold tracking-widest">Цена</span>
                    <span className="text-xl font-black tracking-tight">{product.price?.toLocaleString()} ₸</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-4 bg-brand text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand/10 group-hover:shadow-brand/20"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-premium">
            <p className="text-white/20 uppercase font-bold tracking-widest text-xs">В данной категории пока нет товаров</p>
          </div>
        )}
      </div>
    </div>
  );
}