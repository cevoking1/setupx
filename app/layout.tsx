import './globals.css';
import { CartProvider } from './context/CartContext';

export const metadata = {
  title: 'SetupX | Магазин компьютеров',
  description: 'Премиальные сборки и комплектующие',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-background text-white selection:bg-brand selection:text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}