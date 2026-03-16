'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // Состояние для полей формы
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setStatus('loading');

    // Отправка данных в Supabase
    const { error } = await supabase.from('orders').insert([{
      customer_name: formData.name,
      customer_phone: formData.phone,
      items: cart,
      total_sum: totalPrice,
      status: 'new',
      created_at: new Date()
    }]);

    if (!error) {
      setStatus('success');
      clearCart(); // Очищаем корзину после успеха
    } else {
      console.error('Supabase Error:', error);
      alert('Ошибка при сохранении заказа. Убедитесь, что таблица orders настроена правильно.');
      setStatus('idle');
    }
  };

  // Экран успеха
  if (status === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-6">
        <div className="bg-surface p-12 rounded-premium border border-brand/20 text-center brand-glow">
          <CheckCircle2 size={80} className="text-brand mb-6 mx-auto animate-bounce" />
          <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">Заказ принят!</h1>
          <p className="text-white/40 mb-8 max-w-sm mx-auto">
            Ваша сборка SetupX уже в очереди. Менеджер свяжется с вами в течение 15 минут.
          </p>
          <Link href="/" className="inline-block px-10 py-4 bg-brand text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/catalog" className="flex items-center gap-2 text-white/30 hover:text-white mb-12 transition-colors text-xs uppercase font-bold tracking-widest">
          <ArrowLeft size={14} /> Назад в каталог
        </Link>

        <h1 className="text-4xl font-black uppercase mb-16 tracking-tighter border-l-4 border-brand pl-6">
          Оформление заказа
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* ФОРМА */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleOrder} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-4">Ваше имя</label>
                <input 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="ИВАН ИВАНОВ" 
                  className="w-full bg-surface border border-border p-5 rounded-2xl focus:border-brand outline-none transition-all text-sm font-bold" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-4">Телефон</label>
                <input 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+7 (707) 000-00-00" 
                  className="w-full bg-surface border border-border p-5 rounded-2xl focus:border-brand outline-none transition-all text-sm font-bold" 
                />
              </div>

              <button 
                disabled={status === 'loading' || cart.length === 0} 
                className="w-full py-6 bg-brand text-white font-black uppercase rounded-full tracking-widest hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-20 shadow-xl shadow-brand/20 flex items-center justify-center gap-3"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : 'ПОДТВЕРДИТЬ ЗАКАЗ'}
              </button>
            </form>
          </div>

          {/* ПРЕДПРОСМОТР КОРЗИНЫ */}
          <div className="lg:col-span-5">
            <div className="bg-surface p-8 rounded-premium border border-border sticky top-32">
              <h3 className="font-bold uppercase mb-8 text-white/20 text-xs tracking-widest">Детали заказа</h3>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.length > 0 ? cart.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                    <div>
                        <div className="text-[10px] text-brand font-bold uppercase mb-1">{item.category}</div>
                        <div className="font-bold text-sm text-white/90">{item.name}</div>
                    </div>
                    <span className="font-black text-sm whitespace-nowrap ml-4">{item.price?.toLocaleString()} ₸</span>
                  </div>
                )) : (
                    <div className="text-center py-10 text-white/10 uppercase font-bold text-xs tracking-widest">Корзина пуста</div>
                )}
              </div>

              <div className="mt-12 pt-8 border-t border-brand/20 flex justify-between items-end">
                <div>
                    <span className="block text-[10px] uppercase font-black text-white/20 mb-1">Итоговая сумма</span>
                    <span className="text-3xl font-black text-brand tracking-tighter">{totalPrice?.toLocaleString()} ₸</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}