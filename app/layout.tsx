import './globals.css';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'SetupX | Компьютеры, Комплектующие, Услуги',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ background: '#050505', color: '#fff', margin: 0 }}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}