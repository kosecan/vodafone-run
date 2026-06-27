import type { Metadata } from 'next';
import { Press_Start_2P, Outfit } from 'next/font/google';
import './globals.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
});

const outfit = Outfit({
  weight: ['400', '600', '800'],
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vodafone Run',
  description: 'Engellerden zıpla, mümkün olduğunca koş!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${pressStart2P.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
