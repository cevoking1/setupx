'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', phone: '' });
  const [sent, setSent] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('orders').insert([{
      customer_name: form.name,
      customer_phone: form.phone,
      items: cart,
      total_price: totalPrice
    }]);

    if (!error) {
      setSent(true);
      clearCart();
    }
  };

  if (sent) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white p-8 text-center">
      <h1 className="text-4xl font-black text-brand mb-4 uppercase">Заказ принят!</h1>
      <p className="text-white/40 mb-8">Менеджер SetupX свяжется с вами в течение 15 минут.</p>
      <Link href="/" className="px-8 py-3 bg-white text-black font-bold rounded-full uppercase text-xs tracking-widest">На главную</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-white p-12">
      <div className="max-w-xl mx-auto space-y-12">
        <h1 className="text-3xl font-black uppercase italic">Оформление заказа</h1>
        <div className="bg-surface border border-border p-8 rounded-premium space-y-6">
          <div className="space-y-4">
             {cart.map((item: any, i: number) => (
               <div key={i} className="flex justify-between text-sm border-b border-white/5 pb-2">
                 <span>{item.name}</span>
                 <span className="font-bold">{item.price.toLocaleString()} ₸</span>
               </div>
             ))}
          </div>
          <div className="text-xl font-black text-right tracking-tighter">ИТОГО: {totalPrice.toLocaleString()} ₸</div>
        </div>

        <form onSubmit={handleOrder} className="space-y-4">
          <input 
            required
            placeholder="Ваше имя"
            className="w-full bg-surface border border-border p-4 rounded-xl outline-none focus:border-brand"
            onChange={e => setForm({...form, name: e.target.value})}
          />
          <input 
            required
            placeholder="Номер телефона (+7...)"
            className="w-full bg-surface border border-border p-4 rounded-xl outline-none focus:border-brand"
            onChange={e => setForm({...form, phone: e.target.value})}
          />
          <button className="w-full py-5 bg-brand text-white font-black uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-brand/20">Подтвердить заказ</button>
        </form>
      </div>
    </div>
  );
}