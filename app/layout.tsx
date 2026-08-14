import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { CartDrawer } from '../components/layout/cart-drawer';
import { ToastContainer } from '../components/ui/toast';

export const metadata: Metadata = {
  title: 'Zyvora — Luxury Multi-Vendor E-Commerce & Enterprise Platform',
  description: 'Experience curated multi-vendor luxury products, instant checkout, and complete vendor management with Zyvora.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
