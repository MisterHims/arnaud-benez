import type { Metadata } from "next";
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layouts/Header';
import { Inter } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
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
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
