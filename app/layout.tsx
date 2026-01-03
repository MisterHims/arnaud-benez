import type { Metadata } from "next";
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layouts/Header';
import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  // IMPORTANT : On définit une variable CSS pour Tailwind
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arnaud Benez - Portfolio",
  description: "UI/UX Designer & Front-End Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
